var express = require('express');
var router = express.Router();
var db = require('./db');
var mytime = require('../myPachage/mytime');

var tempList = [[], [], [], [], [], [], [], [], []];
/* GET 设备相关数据 */
router.get('/', function (req, res, err) {

	var sql = `SELECT
	m.machinenumber,
	m.MachineName,--染机名称
	m.OnLine,--在线状态
	m.MachineStateInt,--运行状态
	RTRIM(LTRIM(m.Main_Alarm)) as Main_Alarm,--报警内容
	m.BatchName,--当前批次
	m.BatchRunTime,--批次运行时间
	m.machinemaintemp,-- 喷嘴温度（染缸温度）,
	m.MachineAOut5, --提不轮子速度
	m.MachineAOut8, --主泵速度
	m.MachineAIn1, --主缸水位
	b.zhuzhiling --主指令	
FROM
	Machine_Info_1 m,
	(
	SELECT
		a.MachineName aname,
		CONCAT (
			RTRIM( a.MachineIns1_Text ),
			' ',
			RTRIM( a.MachineIns1_Value ),
			' ',
			RTRIM( a.MachineIns2_Text ),
			' ',
			RTRIM( a.MachineIns2_Value ),
			' ',
			RTRIM( a.MachineIns3_Text ),
			' ',
			RTRIM( a.MachineIns3_Value ),
			' ',
			RTRIM( a.MachineIns4_Text ),
			' ',
			RTRIM( a.MachineIns4_Value ),
			' ',
			RTRIM( a.MachineIns5_Text ),
			' ',
			RTRIM( a.MachineIns5_Value ),
			' ',
			RTRIM( a.MachineIns6_Text ),
			' ',
			RTRIM( a.MachineIns6_Value ) 
		) zhuzhiling 
	FROM
		Machine_Info_1 a 
	) b 
WHERE
	m.MachineName = b.aname 
	-- AND m.machinenumber BETWEEN 1 
	-- AND 17
	AND m.MachineName in ('Q31_ASH2T      ', 'Q33_ASH2T      ', 'Q35_ASH6T      ', 'Q32_ASH6T      ', 'Q36_ASH4T      ', 'Q30_ASH1T      ', 'Q29_ASH1T      ', 'Q19_ASH4T      ', 'Q18_ASH4T      ') 
ORDER BY
	m.MachineName`;

	// console.log(sql);
	db.sqlexe(sql, function (err, result) {
		if (err) {
			// console.log(err);
			res.send({"err":"数据库连接信息错误"});
			return;
		}
		// console.log(result.recordset);
		result.recordset.forEach((element, index) => {
			tempList[index].push(Number(element.machinemaintemp.trim()).toFixed(2).valueOf());
			if(tempList[index].length > 20){
				tempList[index].shift();
			}

			while(tempList[index].length < 20){
				tempList[index].push(Number(element.machinemaintemp.trim()).toFixed(2).valueOf());
			}
			element.tempList = tempList[index];


		});
		console.log(tempList);
		res.send(result);
	});
});

module.exports = router;
