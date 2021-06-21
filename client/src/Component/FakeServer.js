import alasql from "alasql";
let data;
export default function ShowStageDetailList(allData, stageId, jobId) {
  alasql.options.cache = false;
  //console.log(allData);
  data = allData;
  const sql = `Select * from ? where jobId = ${jobId} and stageId =${stageId} group by stageDetailId`;
  console.log("sqll", sql);
  return alasql(sql, [allData]);
}

export function ShowStageDetailValue(allData, row) {
  alasql.options.cache = false;
  //console.log(allData);
  console.log("stage detail pe hoon", data);
  const sql = `Select * from ? where stageId = ${row.stageId} and stageDetailId = ${row.stageDetailId} and jobId = ${row.jobId}`;
  console.log("data is here", sql);
  const resp = alasql(sql, [allData]);
  console.log("stageDet response is", resp);
  return resp;
}
