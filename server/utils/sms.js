var QcloudSms = require("qcloudsms_js")

var appid = 1400247952

var appKey = "3eb279c305f248446e9d6b0f78116b2b"

var templateId = 404374

var smsSign = "curtaintan"

var qcloudsms = QcloudSms(appid, appKey);

var ssender = qcloudsms.SmsSingleSender()


// params是一个数组，依次代表模板变量里的值
var mysendmsg = function( phone, params ){
  return new Promise( ( returnRes, rej ) => {
    ssender.sendWithParam(
      86, 
      phone, 
      templateId,
      params, 
      smsSign, "", "", ( err, res, resData ) => {
        returnRes( resData )
      }
    )
  })
}


exports.mysendmsg = mysendmsg;
