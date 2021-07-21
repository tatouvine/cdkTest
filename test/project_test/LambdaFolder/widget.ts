/**
 * This Lambda function generates a number and in the different case he returns
 * an StatusCode 200, 204, 400, 403 or 500. If he is 200 he return the number
 * generate
 */

setTimeout(() => {
    exports.handler = async (event: any, context: any, callback: (arg0: null, arg1: { statusCode: number; headers: { "Content-Type": string; "Access-Control-Allow-Origin": string; }; }) => void) => {
        let random_number: number = Math.random() * 100;
        let content: string;
        let statusCode: number;

        switch (true) {
            case random_number < 20: {
                statusCode = 200;
                content = random_number.toString();
                break;
            }//200

            case random_number < 40: {
                statusCode = 204;
                content = "No Content";
                break;
            }//204

            case random_number < 60: {
                statusCode = 400;
                content = "Bad Request";
                break;
            }//400

            case random_number < 80: {
                statusCode = 403;
                content = "Forbidden";
                break;
            }//403
            case random_number < 101: {
                statusCode = 500;
                content = "Internal Server Error";
                break;
            }//500
            default: {
                statusCode = 404;
                content = "Error 404"
            }
        }

        let res = {
            "statusCode": statusCode,
            "headers": {
                "Content-Type": "*/*",
                "Access-Control-Allow-Origin": "*"
            },
            body: content
        };

        callback(null, res);

    };
}, 500);
