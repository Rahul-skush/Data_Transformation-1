const { json } = require("body-parser");
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

stageDetail.updateById = async (reqParams, reqBody, result) => {

  let qry = "UPDATE stage_table SET ?" + reqBody + " WHERE stageDetailId = " + reqParams.stageDetailId +
            " AND stageId = " + reqParams.stageId + " AND jobId = " + reqParams.jobId ;
            console.log(qry);
            return ;
}

stageDetail.remove = async (reqParams, result) => {
  console.log(reqParams);
  let qryDelete = "DELETE FROM stage_table " + " WHERE stageDetailId = " + reqParams.stageDetailId +
  " AND stageId = " + reqParams.stageId + " AND jobId = " + reqParams.jobId ;
  console.log(qryDelete);
  try{
    await sql.query(qryDelete, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found stageDetail 
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted stageDetail: ");
      result(null, res);
    });
  }catch(err){
    console.log("error: ", err);
  }
}


// ishika ke modules




module.exports = stageDetail;
