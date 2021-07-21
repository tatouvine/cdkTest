import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as apigateway from '@aws-cdk/aws-apigateway';
import * as lambda from '@aws-cdk/aws-lambda';
import * as widget_service from '../lib/widget_service';


export class ProjectTestStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // creation BUCKET

    const bucket = new s3.Bucket(this, 'WebsiteBucket', {
        websiteIndexDocument: 'index.html',
        publicReadAccess: true
    });

    // creation API REST

    const api = new apigateway.RestApi(this, 'my_api_cdk', {
        description: 'example api gateway cdk',
        deployOptions: {
            stageName: 'dev',
        },
        // 👇 enable CORS
        defaultCorsPreflightOptions: {
            allowHeaders: [
                'Content-Type',
                'X-Amz-Date',
                'Authorization',
                'X-Api-Key',
            ],
            allowMethods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
            allowCredentials: true,
            allowOrigins: ['http://localhost:3000'],
        },
    });
    // 👇 create an Output for the API URL
    new cdk.CfnOutput(this, 'apiUrl', {value: api.url});

///-------------------------
new widget_service.WidgetService(this, 'Widget');


}


}