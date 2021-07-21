import * as core from "@aws-cdk/core";
import * as apigateway from "@aws-cdk/aws-apigateway";
import * as lambda from "@aws-cdk/aws-lambda";
import * as s3 from "@aws-cdk/aws-s3";


/**
 * this fill is used to manage the API part
 *
 * Create Bucket
 * Create Lambda
 * Create API
 * Link Lambda with API point
 */


export class WidgetService extends core.Construct {
    readonly api: apigateway.RestApi;
    readonly bucket: s3.Bucket;
    readonly handler: lambda.Function;
    readonly getWidgetsIntegration: apigateway.LambdaIntegration;

    constructor(scope: core.Construct, id: string) {
        super(scope, id);

        this.bucket = new s3.Bucket(this, "WidgetStore");

        this.handler = new lambda.Function(this, "WidgetHandler", {
            runtime: lambda.Runtime.NODEJS_14_X, // So we can use async in widget.ts
            code: lambda.Code.fromAsset('./LambdaFolder'),
            handler: "widget.handler",
            environment: {
                BUCKET: this.bucket.bucketName
            }
        });

        this.bucket.grantReadWrite(this.handler); // was: handler.role);

        this.api = new apigateway.RestApi(this, "widgets-api", {
            restApiName: "CDK TEST API",
            description: "This service serves widgets."
        });

        this.getWidgetsIntegration = new apigateway.LambdaIntegration(this.handler, {
            integrationResponses: [{
                statusCode: '200',
            }],
        });

        this.api.root.addMethod("GET", this.getWidgetsIntegration)
    }
}