exports.handler = async (event,context,callback) => {
    let content = JSON.parse(event.body);
    let statusCode=200;
    if(!content){
        statusCode=502;
    }
    let numberFormUser = content["number"];

    numberFormUser=numberFormUser*2;
    var res ={
        "statusCode": statusCode,
        "headers": {
            "Content-Type": "*/*",
            "Access-Control-Allow-Origin":"*"
        },
        "body":""
    };
    res.body=JSON.stringify(numberFormUser);
    callback(null,res);
};
