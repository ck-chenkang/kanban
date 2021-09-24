var getNowFormatDate = function(minutes) {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    //前 minutes 分钟时间
     var minutes=parseInt(minutes);  

  var   interTimes=minutes*60*1000;

  var interTimes=parseInt(interTimes);  
     date=new   Date(Date.parse(date)-interTimes);
    
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    if (hour >= 0 && hour <= 9) {
            hour = "0" + hour;
    }
    if (minutes >= 0 && minutes <= 9) {
            minutes = "0" + minutes;
    }
    // var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    //         + " " + hour + seperator2 + minutes
    //         + seperator2 + date.getSeconds();
    var currentdate = month + seperator1 + strDate
            + " " + hour + seperator2 + minutes
            + seperator2 + date.getSeconds();
    return currentdate;
}

exports.getNowFormatDate = getNowFormatDate;