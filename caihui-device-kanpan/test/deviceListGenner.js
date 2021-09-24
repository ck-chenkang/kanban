var fs = require('fs');
var path = require('path');


var mypath = path.join(__dirname, './devices.txt');
// var mypath2 = path.join(__dirname, './mytext2.txt');

var data = fs.readFileSync(mypath, 'utf-8');
// var data2 = fs.readFileSync(mypath2, 'utf-8');

var myarray = data.split("\r\n");
// var myarray2 = data2.split("\r\n");


var str = "(";
console.log(myarray.length);
myarray.forEach(function(value, index){
    var midArr = value.split(";");
    var midStr2 = index + 1;
    midArr.pop();
    midArr.forEach(function(value, index){
        fs.appendFileSync(path.join(__dirname, 'my.txt'), midStr2 + " " + value + "\n");
    });

});

str += ")";
// fs.appendFileSync(path.join(__dirname, 'my.txt'), str);