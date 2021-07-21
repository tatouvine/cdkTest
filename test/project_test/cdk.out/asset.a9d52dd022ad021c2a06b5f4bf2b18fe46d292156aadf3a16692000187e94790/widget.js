/**
 * This Lambda function generates a number and in the different case he returns
 * an StatusCode 200, 204, 400, 403 or 500. If he is 200 he return the number
 * generate
 */

exports.handler = async (event, context, callback) => {
    sleep(500);
    let random_number = Math.random() * 100;
    let content = "";
    let statusCode = 200

    switch (true) {
        case random_number < 20: {
            statusCode = 200;
            content = random_number;
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
    }

    var res = {
        "statusCode": statusCode,
        "headers": {
            "Content-Type": "*/*",
            "Access-Control-Allow-Origin": "*"
        }
    };
    res.body = content;
    callback(null, res);
};


function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }

    }

}