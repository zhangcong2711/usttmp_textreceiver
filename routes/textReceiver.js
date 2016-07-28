/**
 * Created by zhangcong on 16/7/28.
 */


var mysql = require('mysql');
var pool  = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root.123',
    database: 'USTTMP',
    port: 3306
});


exports.fnAdd = function(req, res, next){


    var message = req.body.message;
    var title = message.title;
    var text = message.text;
    var textcreatetime = message.textCreatetime;
    var tag = message.tag;

    // conn.connect();


    pool.getConnection(function(connerr, connection) {

        if(connerr){
            res.send('<message><result>failed</result><info>'+connerr.stack+'</info></message>');
        }else{
            var insertSQL="INSERT INTO c_rawtext(mme_lastupdate, mme_updater, title, text, tag, text_createdate) "
                + "VALUES (NOW(), 'AK', '"+title+"', '"+text+"', '"+tag+"', '"+textcreatetime+"')";
            //insert
            connection.query(insertSQL, function (sqlerr, res1) {
                if (sqlerr){
                    console.log(sqlerr);

                    res.send('<message><result>failed</result><info>'+sqlerr.stack+'</info></message>');
                }else{
                    console.log("INSERT Return ==> ");
                    console.log(res1);

                    res.send('<message><result>success</result><info>created successfully!</info></message>');
                }
            });
        }
    });


    // conn.end();

};

exports.fnInterfaceResponser = function(req, res, next){

    var message = req.body.message;
    var source = message.source;
    var target = message.target;
    var type = message.type;
    var invokeType = message.invokeType;
    var timeStamp = message.timeStamp;
    var methodName = message.methodName;
    var methodBody = message.methodBody;



};


