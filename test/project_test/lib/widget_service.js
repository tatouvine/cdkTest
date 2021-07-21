"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WidgetService = void 0;
const core = require("@aws-cdk/core");
const apigateway = require("@aws-cdk/aws-apigateway");
const lambda = require("@aws-cdk/aws-lambda");
const s3 = require("@aws-cdk/aws-s3");
const path = require("path");
class WidgetService extends core.Construct {
    constructor(scope, id) {
        super(scope, id);
        const bucket = new s3.Bucket(this, "WidgetStore");
        const handler = new lambda.Function(this, "WidgetHandler", {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset(path.join(__dirname, './../nodejs/node_modules')),
            handler: "widget.handler",
            environment: {
                BUCKET: bucket.bucketName
            }
        });
        bucket.grantReadWrite(handler); // was: handler.role);
        const api = new apigateway.RestApi(this, "widgets-api", {
            restApiName: "Widget Service",
            description: "This service serves widgets."
        });
        const getWidgetsIntegration = new apigateway.LambdaIntegration(handler, {
            integrationResponses: [{
                    statusCode: '200',
                }],
            requestTemplates: {
                "application/json": '{ "statusCode": "200" }',
            },
        });
        api.root.addMethod("GET", getWidgetsIntegration, {
            methodResponses: [
                { statusCode: '200' },
                { statusCode: '204' },
                { statusCode: '400' },
                { statusCode: '403' },
                { statusCode: '500' }
            ],
        }); // GET /
    }
}
exports.WidgetService = WidgetService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0X3NlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3aWRnZXRfc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxzQ0FBc0M7QUFDdEMsc0RBQXNEO0FBQ3RELDhDQUE4QztBQUM5QyxzQ0FBc0M7QUFDdEMsNkJBQTZCO0FBRTdCLE1BQWEsYUFBYyxTQUFRLElBQUksQ0FBQyxTQUFTO0lBQzdDLFlBQVksS0FBcUIsRUFBRSxFQUFVO1FBQ3pDLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFakIsTUFBTSxNQUFNLEdBQUcsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsQ0FBQztRQUVsRCxNQUFNLE9BQU8sR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLGVBQWUsRUFBRTtZQUN2RCxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1lBQ25DLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO1lBQzdFLE9BQU8sRUFBRSxnQkFBZ0I7WUFDekIsV0FBVyxFQUFFO2dCQUNULE1BQU0sRUFBRSxNQUFNLENBQUMsVUFBVTthQUM1QjtTQUNKLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxzQkFBc0I7UUFFdEQsTUFBTSxHQUFHLEdBQUcsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxhQUFhLEVBQUU7WUFDcEQsV0FBVyxFQUFFLGdCQUFnQjtZQUM3QixXQUFXLEVBQUUsOEJBQThCO1NBQzlDLENBQUMsQ0FBQztRQUVILE1BQU0scUJBQXFCLEdBQUcsSUFBSSxVQUFVLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFO1lBQ3BFLG9CQUFvQixFQUFFLENBQUM7b0JBQ25CLFVBQVUsRUFBRSxLQUFLO2lCQUNwQixDQUFDO1lBQ0YsZ0JBQWdCLEVBQUU7Z0JBQ2Qsa0JBQWtCLEVBQUUseUJBQXlCO2FBQ2hEO1NBQ0osQ0FBQyxDQUFDO1FBRUgsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLHFCQUFxQixFQUFFO1lBQzdDLGVBQWUsRUFBRTtnQkFDYixFQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUM7Z0JBQ25CLEVBQUMsVUFBVSxFQUFFLEtBQUssRUFBQztnQkFDbkIsRUFBQyxVQUFVLEVBQUUsS0FBSyxFQUFDO2dCQUNuQixFQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUM7Z0JBQ25CLEVBQUMsVUFBVSxFQUFFLEtBQUssRUFBQzthQUN0QjtTQUNKLENBQUMsQ0FBQyxDQUFDLFFBQVE7SUFDaEIsQ0FBQztDQUNKO0FBekNELHNDQXlDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNvcmUgZnJvbSBcIkBhd3MtY2RrL2NvcmVcIjtcbmltcG9ydCAqIGFzIGFwaWdhdGV3YXkgZnJvbSBcIkBhd3MtY2RrL2F3cy1hcGlnYXRld2F5XCI7XG5pbXBvcnQgKiBhcyBsYW1iZGEgZnJvbSBcIkBhd3MtY2RrL2F3cy1sYW1iZGFcIjtcbmltcG9ydCAqIGFzIHMzIGZyb20gXCJAYXdzLWNkay9hd3MtczNcIjtcbmltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcblxuZXhwb3J0IGNsYXNzIFdpZGdldFNlcnZpY2UgZXh0ZW5kcyBjb3JlLkNvbnN0cnVjdCB7XG4gICAgY29uc3RydWN0b3Ioc2NvcGU6IGNvcmUuQ29uc3RydWN0LCBpZDogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKHNjb3BlLCBpZCk7XG5cbiAgICAgICAgY29uc3QgYnVja2V0ID0gbmV3IHMzLkJ1Y2tldCh0aGlzLCBcIldpZGdldFN0b3JlXCIpO1xuXG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsIFwiV2lkZ2V0SGFuZGxlclwiLCB7XG4gICAgICAgICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTRfWCwgLy8gU28gd2UgY2FuIHVzZSBhc3luYyBpbiB3aWRnZXQuanNcbiAgICAgICAgICAgIGNvZGU6IGxhbWJkYS5Db2RlLmZyb21Bc3NldChwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi8uLi9ub2RlanMvbm9kZV9tb2R1bGVzJykpLFxuICAgICAgICAgICAgaGFuZGxlcjogXCJ3aWRnZXQuaGFuZGxlclwiLFxuICAgICAgICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgICAgICAgICBCVUNLRVQ6IGJ1Y2tldC5idWNrZXROYW1lXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGJ1Y2tldC5ncmFudFJlYWRXcml0ZShoYW5kbGVyKTsgLy8gd2FzOiBoYW5kbGVyLnJvbGUpO1xuXG4gICAgICAgIGNvbnN0IGFwaSA9IG5ldyBhcGlnYXRld2F5LlJlc3RBcGkodGhpcywgXCJ3aWRnZXRzLWFwaVwiLCB7XG4gICAgICAgICAgICByZXN0QXBpTmFtZTogXCJXaWRnZXQgU2VydmljZVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVGhpcyBzZXJ2aWNlIHNlcnZlcyB3aWRnZXRzLlwiXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGdldFdpZGdldHNJbnRlZ3JhdGlvbiA9IG5ldyBhcGlnYXRld2F5LkxhbWJkYUludGVncmF0aW9uKGhhbmRsZXIsIHtcbiAgICAgICAgICAgIGludGVncmF0aW9uUmVzcG9uc2VzOiBbe1xuICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6ICcyMDAnLFxuICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICByZXF1ZXN0VGVtcGxhdGVzOiB7XG4gICAgICAgICAgICAgICAgXCJhcHBsaWNhdGlvbi9qc29uXCI6ICd7IFwic3RhdHVzQ29kZVwiOiBcIjIwMFwiIH0nLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYXBpLnJvb3QuYWRkTWV0aG9kKFwiR0VUXCIsIGdldFdpZGdldHNJbnRlZ3JhdGlvbiwge1xuICAgICAgICAgICAgbWV0aG9kUmVzcG9uc2VzOiBbXG4gICAgICAgICAgICAgICAge3N0YXR1c0NvZGU6ICcyMDAnfSxcbiAgICAgICAgICAgICAgICB7c3RhdHVzQ29kZTogJzIwNCd9LFxuICAgICAgICAgICAgICAgIHtzdGF0dXNDb2RlOiAnNDAwJ30sXG4gICAgICAgICAgICAgICAge3N0YXR1c0NvZGU6ICc0MDMnfSxcbiAgICAgICAgICAgICAgICB7c3RhdHVzQ29kZTogJzUwMCd9XG4gICAgICAgICAgICBdLFxuICAgICAgICB9KTsgLy8gR0VUIC9cbiAgICB9XG59Il19