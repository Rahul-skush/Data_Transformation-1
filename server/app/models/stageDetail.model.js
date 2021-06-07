const sql = require("./db.js");

const stageDetail = function(stageDetail){

}
stageDetail.createStage = (req, result) => {
  let qry = "CREATE TABLE "+ req +"( ID INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,"
          + "jobId INT(6) UNSIGNED, stageId INT(6) UNSIGNED, stageDetailId INT(6) UNSIGNED,  property varchar(50), property_value varchar(1000))";

  console.log(qry);
  sql.query(qry, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    else {console.log("success")}
  });
};

stageDetail.createStageRecord = (stageName, req, res) => {
  let qry = "INSERT INTO " + stageName + " SET ?";
  console.log(qry);
  sql.query(qry, req, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    else {console.log("success")}
  });
}


stageDetail.getAll = (req, result)=>{
  let qry = "SELECT * FROM stage_table";

  sql.query(qry, req, (err, res) => {
    if(err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }else {
      console.log("success")
      result(null, res);
   }
  })
}

module.exports = stageDetail;