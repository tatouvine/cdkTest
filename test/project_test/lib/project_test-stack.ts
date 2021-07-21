import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as apigateway from '@aws-cdk/aws-apigateway';
import * as widget_service from '../lib/widget_service';
import * as s3deploy from '@aws-cdk/aws-s3-deployment';
import * as route53 from '@aws-cdk/aws-route53';
import * as route53Targets from '@aws-cdk/aws-route53-targets';
import * as acm from '@aws-cdk/aws-certificatemanager';
import * as cloudfront from '@aws-cdk/aws-cloudfront';
import * as origins from '@aws-cdk/aws-cloudfront-origins';
import {CloudFrontTarget} from "@aws-cdk/aws-route53-targets";


/**
 * This fill is the main fill and he regroup all information call for AWS
 *
 * Create my bucket
 * Call My Service to create my API REST,my Lambda and my API point
 * Push the fill in the bucket
 * Create an acces for my zone 53
 * Create an Certificate
 * Create a Cloud Front to custom URL for the Web Site
 * Create a API Domain to custom URL
 */


export class ProjectTestStack extends cdk.Stack {

    readonly bucket: s3.Bucket;
    readonly widgetService: widget_service.WidgetService;
    readonly hostedZone: route53.IHostedZone;
    readonly api: apigateway.RestApi;
    readonly wildcardCertificate: acm.DnsValidatedCertificate;
    readonly cloudFront: cloudfront.Distribution;

    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        this.bucket = new s3.Bucket(this, 'WebsiteBucket', {
            websiteIndexDocument: 'index.html',
            publicReadAccess: true
        });

        this.widgetService = new widget_service.WidgetService(this, 'cdk_api');

        new s3deploy.BucketDeployment(this, 'DeployWebsite', {
            sources: [s3deploy.Source.asset('./src')],
            destinationBucket: this.bucket,
            destinationKeyPrefix: '' // optional prefix in destination bucket
        });

        this.hostedZone = route53.HostedZone.fromLookup(this, "HostedZone", {
            domainName: 'emo.d.kodehyve.com',
        });

        this.wildcardCertificate = new acm.DnsValidatedCertificate(this, "Certificate2", {
            domainName: 'cdk.emo.d.kodehyve.com',
            subjectAlternativeNames: ['*.cdk.emo.d.kodehyve.com'],
            hostedZone: this.hostedZone,
            region: "us-east-1", // Cloudfront only checks this region for certificates.
        });

        this.cloudFront = new cloudfront.Distribution(this, 'myCloudFrontCDK', {
            defaultBehavior: {origin: new origins.S3Origin(this.bucket)},
            certificate: this.wildcardCertificate,
            domainNames: ['www.cdk.emo.d.kodehyve.com']
        });

        new route53.ARecord(this, 'AliasRecordCloudFront', {
            zone: this.hostedZone,
            recordName: 'www.cdk.emo.d.kodehyve.com',
            target: route53.RecordTarget.fromAlias(new CloudFrontTarget(this.cloudFront)),
        });

        const apiDomainName = new apigateway.DomainName(this, 'custom-domain-for-api', {
            domainName: 'api.cdk.emo.d.kodehyve.com',
            certificate: this.wildcardCertificate,
            endpointType: apigateway.EndpointType.EDGE, // default is REGIONAL
            securityPolicy: apigateway.SecurityPolicy.TLS_1_2
        });

        new route53.ARecord(this, "ApiDomainAliasRecord", {
            zone: this.hostedZone,
            recordName: 'api.cdk.emo.d.kodehyve.com',
            target: route53.RecordTarget.fromAlias(
                new route53Targets.ApiGatewayDomain(apiDomainName)
            ),
        });

        apiDomainName.addBasePathMapping(this.widgetService.api);

    }


}