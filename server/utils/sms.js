var QcloudSms = require("qcloudsms_js")

var appid = 1400247952

var appKey = "3eb279c305f248446e9d6b0f78116b2b"

var templateId = 404374

var smsSign = "curtaintan"

var qcloudsms = QcloudSms(appid, appKey);

function callback(err, res, resData) {
    if (err) {
        console.log("err: ", err);
    } else {
        console.log("request data: ", res.req);
        console.log("response data: ", resData);
    }
}

var ssender = qcloudsms.SmsSingleSender()


// params是一个数组，依次代表模板变量里的值
var mysendmsg = function( phone, params ){
    ssender.sendWithParam(
        86, 
        phone, 
        templateId,
        params, 
        smsSign, "", "", callback
    )
} 


exports.mysendmsg = mysendmsg;

