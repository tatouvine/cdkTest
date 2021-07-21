"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectTestStack = void 0;
const cdk = require("@aws-cdk/core");
const s3 = require("@aws-cdk/aws-s3");
const apigateway = require("@aws-cdk/aws-apigateway");
const widget_service = require("../lib/widget_service");
const s3deploy = require("@aws-cdk/aws-s3-deployment");
class ProjectTestStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // create BUCKET
        const bucket = new s3.Bucket(this, 'WebsiteBucket', {
            websiteIndexDocument: 'index.html',
            publicReadAccess: true
        });
        // create API REST
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
        new cdk.CfnOutput(this, 'apiUrl', { value: api.url });
        //-------------------------
        new widget_service.WidgetService(this, 'Widget');
        //Push in the bucket the fill
        new s3deploy.BucketDeployment(this, 'DeployWebsite', {
            sources: [s3deploy.Source.asset('./src')],
            destinationBucket: bucket,
            destinationKeyPrefix: '' // optional prefix in destination bucket
        });
        //-------------
        /**
        new MyDevStack(app, 'dev', {
            env: {
                account: process.env.CDK_DEFAULT_ACCOUNT,
                region: process.env.CDK_DEFAULT_REGION
            }});

        const rootDomain = "test.org";
        const zone = route53.HostedZone.fromLookup(this, "baseZone", {
            domainName: rootDomain,
        });

        new route53.ARecord(this, "24i15jc9m4", {
            zone: zone,
            recordName: "api-test-cdk",
            target: route53.RecordTarget.fromAlias(
                new route53Targets.ApiGateway(api)
            ),
        });
**/
    }
}
exports.ProjectTestStack = ProjectTestStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdF90ZXN0LXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicHJvamVjdF90ZXN0LXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUFxQztBQUNyQyxzQ0FBc0M7QUFDdEMsc0RBQXNEO0FBRXRELHdEQUF3RDtBQUN4RCx1REFBdUQ7QUFLdkQsTUFBYSxnQkFBaUIsU0FBUSxHQUFHLENBQUMsS0FBSztJQUMzQyxZQUFZLEtBQW9CLEVBQUUsRUFBVSxFQUFFLEtBQXNCO1FBQ2hFLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLGdCQUFnQjtRQUVoQixNQUFNLE1BQU0sR0FBRyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLGVBQWUsRUFBRTtZQUNoRCxvQkFBb0IsRUFBRSxZQUFZO1lBQ2xDLGdCQUFnQixFQUFFLElBQUk7U0FDekIsQ0FBQyxDQUFDO1FBRUgsa0JBQWtCO1FBRWxCLE1BQU0sR0FBRyxHQUFHLElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFO1lBQ25ELFdBQVcsRUFBRSx5QkFBeUI7WUFDdEMsYUFBYSxFQUFFO2dCQUNYLFNBQVMsRUFBRSxLQUFLO2FBQ25CO1lBQ0QsaUJBQWlCO1lBQ2pCLDJCQUEyQixFQUFFO2dCQUN6QixZQUFZLEVBQUU7b0JBQ1YsY0FBYztvQkFDZCxZQUFZO29CQUNaLGVBQWU7b0JBQ2YsV0FBVztpQkFDZDtnQkFDRCxZQUFZLEVBQUUsQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQztnQkFDbEUsZ0JBQWdCLEVBQUUsSUFBSTtnQkFDdEIsWUFBWSxFQUFFLENBQUMsdUJBQXVCLENBQUM7YUFDMUM7U0FDSixDQUFDLENBQUM7UUFDSCxzQ0FBc0M7UUFDdEMsSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsRUFBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBQyxDQUFDLENBQUM7UUFFcEQsMkJBQTJCO1FBQzNCLElBQUksY0FBYyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFHakQsNkJBQTZCO1FBRTdCLElBQUksUUFBUSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxlQUFlLEVBQUU7WUFDakQsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDekMsaUJBQWlCLEVBQUUsTUFBTTtZQUN6QixvQkFBb0IsRUFBRSxFQUFFLENBQUMsd0NBQXdDO1NBQ3BFLENBQUMsQ0FBQztRQUVILGVBQWU7UUFJZjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CTDtJQUVDLENBQUM7Q0FHSjtBQTFFRCw0Q0EwRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnQGF3cy1jZGsvY29yZSc7XG5pbXBvcnQgKiBhcyBzMyBmcm9tICdAYXdzLWNkay9hd3MtczMnO1xuaW1wb3J0ICogYXMgYXBpZ2F0ZXdheSBmcm9tICdAYXdzLWNkay9hd3MtYXBpZ2F0ZXdheSc7XG5pbXBvcnQgKiBhcyBsYW1iZGEgZnJvbSAnQGF3cy1jZGsvYXdzLWxhbWJkYSc7XG5pbXBvcnQgKiBhcyB3aWRnZXRfc2VydmljZSBmcm9tICcuLi9saWIvd2lkZ2V0X3NlcnZpY2UnO1xuaW1wb3J0ICogYXMgczNkZXBsb3kgZnJvbSAnQGF3cy1jZGsvYXdzLXMzLWRlcGxveW1lbnQnO1xuaW1wb3J0ICogYXMgcm91dGU1MyBmcm9tICdAYXdzLWNkay9hd3Mtcm91dGU1Myc7XG5pbXBvcnQgKiBhcyByb3V0ZTUzVGFyZ2V0cyBmcm9tICdAYXdzLWNkay9hd3Mtcm91dGU1My10YXJnZXRzJztcblxuXG5leHBvcnQgY2xhc3MgUHJvamVjdFRlc3RTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XG4gICAgY29uc3RydWN0b3Ioc2NvcGU6IGNkay5Db25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcbiAgICAgICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICAgICAgLy8gY3JlYXRlIEJVQ0tFVFxuXG4gICAgICAgIGNvbnN0IGJ1Y2tldCA9IG5ldyBzMy5CdWNrZXQodGhpcywgJ1dlYnNpdGVCdWNrZXQnLCB7XG4gICAgICAgICAgICB3ZWJzaXRlSW5kZXhEb2N1bWVudDogJ2luZGV4Lmh0bWwnLFxuICAgICAgICAgICAgcHVibGljUmVhZEFjY2VzczogdHJ1ZVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBjcmVhdGUgQVBJIFJFU1RcblxuICAgICAgICBjb25zdCBhcGkgPSBuZXcgYXBpZ2F0ZXdheS5SZXN0QXBpKHRoaXMsICdteV9hcGlfY2RrJywge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdleGFtcGxlIGFwaSBnYXRld2F5IGNkaycsXG4gICAgICAgICAgICBkZXBsb3lPcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgc3RhZ2VOYW1lOiAnZGV2JyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyDwn5GHIGVuYWJsZSBDT1JTXG4gICAgICAgICAgICBkZWZhdWx0Q29yc1ByZWZsaWdodE9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICBhbGxvd0hlYWRlcnM6IFtcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZScsXG4gICAgICAgICAgICAgICAgICAgICdYLUFtei1EYXRlJyxcbiAgICAgICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nLFxuICAgICAgICAgICAgICAgICAgICAnWC1BcGktS2V5JyxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIGFsbG93TWV0aG9kczogWydPUFRJT05TJywgJ0dFVCcsICdQT1NUJywgJ1BVVCcsICdQQVRDSCcsICdERUxFVEUnXSxcbiAgICAgICAgICAgICAgICBhbGxvd0NyZWRlbnRpYWxzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGFsbG93T3JpZ2luczogWydodHRwOi8vbG9jYWxob3N0OjMwMDAnXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgICAvLyDwn5GHIGNyZWF0ZSBhbiBPdXRwdXQgZm9yIHRoZSBBUEkgVVJMXG4gICAgICAgIG5ldyBjZGsuQ2ZuT3V0cHV0KHRoaXMsICdhcGlVcmwnLCB7dmFsdWU6IGFwaS51cmx9KTtcblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgbmV3IHdpZGdldF9zZXJ2aWNlLldpZGdldFNlcnZpY2UodGhpcywgJ1dpZGdldCcpO1xuXG5cbiAgICAgICAgLy9QdXNoIGluIHRoZSBidWNrZXQgdGhlIGZpbGxcblxuICAgICAgICBuZXcgczNkZXBsb3kuQnVja2V0RGVwbG95bWVudCh0aGlzLCAnRGVwbG95V2Vic2l0ZScsIHtcbiAgICAgICAgICAgIHNvdXJjZXM6IFtzM2RlcGxveS5Tb3VyY2UuYXNzZXQoJy4vc3JjJyldLFxuICAgICAgICAgICAgZGVzdGluYXRpb25CdWNrZXQ6IGJ1Y2tldCxcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uS2V5UHJlZml4OiAnJyAvLyBvcHRpb25hbCBwcmVmaXggaW4gZGVzdGluYXRpb24gYnVja2V0XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLVxuXG5cblxuICAgICAgICAvKipcbiAgICAgICAgbmV3IE15RGV2U3RhY2soYXBwLCAnZGV2Jywge1xuICAgICAgICAgICAgZW52OiB7XG4gICAgICAgICAgICAgICAgYWNjb3VudDogcHJvY2Vzcy5lbnYuQ0RLX0RFRkFVTFRfQUNDT1VOVCxcbiAgICAgICAgICAgICAgICByZWdpb246IHByb2Nlc3MuZW52LkNES19ERUZBVUxUX1JFR0lPTlxuICAgICAgICAgICAgfX0pO1xuXG4gICAgICAgIGNvbnN0IHJvb3REb21haW4gPSBcInRlc3Qub3JnXCI7XG4gICAgICAgIGNvbnN0IHpvbmUgPSByb3V0ZTUzLkhvc3RlZFpvbmUuZnJvbUxvb2t1cCh0aGlzLCBcImJhc2Vab25lXCIsIHtcbiAgICAgICAgICAgIGRvbWFpbk5hbWU6IHJvb3REb21haW4sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIG5ldyByb3V0ZTUzLkFSZWNvcmQodGhpcywgXCIyNGkxNWpjOW00XCIsIHtcbiAgICAgICAgICAgIHpvbmU6IHpvbmUsXG4gICAgICAgICAgICByZWNvcmROYW1lOiBcImFwaS10ZXN0LWNka1wiLFxuICAgICAgICAgICAgdGFyZ2V0OiByb3V0ZTUzLlJlY29yZFRhcmdldC5mcm9tQWxpYXMoXG4gICAgICAgICAgICAgICAgbmV3IHJvdXRlNTNUYXJnZXRzLkFwaUdhdGV3YXkoYXBpKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgfSk7XG4qKi9cblxuICAgIH1cblxuXG59Il19