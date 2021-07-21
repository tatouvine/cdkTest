exports.handler = async (event, context, callback) => {
    sleep(500);
    let value = Math.random();
    let randomtest = Math.random()*100;
    let content="";
    let statusCode=200

    switch(true){
        case randomtest<20:
        {
            statusCode = 200;
            content = randomtest;
            break;
        }//200

        case randomtest<40:{
            statusCode = 204;
            content="No Content";
            break;
        }//204

        case randomtest<60:{
            statusCode = 400;
            content="Bad Request";
            break;
        }//400

        case randomtest<80:{
            statusCode = 403;
            content="Forbidden";
            break;
        }//403

        case randomtest<101:{
            statusCode = 500;
            content="Internal Server Error";
            break;
        }//500
    }

    var res ={
        "statusCode": statusCode,
        "headers": {
            "Content-Type": "*/*",
            "Access-Control-Allow-Origin":"*"
        }
    };
    res.body=content;
    callback(null,res);
};



function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }

    }

}