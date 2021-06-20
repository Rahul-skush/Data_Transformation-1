const { json } = require("body-parser");
const sql = require("./db.js");
const tableConfig = require("../config/table.config.js");
const stageDetail = function (stageDetail) {};

stageDetail.createStageRecord = (req, res) => {
  let qry = "INSERT INTO " + tableConfig.STAGE_DETAIL_TABLE + " SET ?";
  sql.query(qry, req, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else {
      console.log("success");
    }
  });
};

stageDetail.getAll = (req, result) => {
  let qry = `SELECT * FROM ${tableConfig.STAGE_DETAIL_TABLE}`;

  sql.query(qry, req, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else {
      console.log("success");
      result(null, res);
    }
  });
};

stageDetail.updateById = async (reqParams, reqBody, result) => {
  let qry =
    `UPDATE ${tableConfig.STAGE_DETAIL_TABLE} SET ?` +
    reqBody +
    " WHERE stageDetailId = " +
    reqParams.stageDetailId +
    " AND stageId = " +
    reqParams.stageId +
    " AND jobId = " +
    reqParams.jobId;
  console.log(qry);
  return;
};

stageDetail.remove = async (reqParams, result) => {
  console.log(reqParams);
  let qryDelete = ` DELETE FROM ${tableConfig.STAGE_DETAIL_TABLE} WHERE `;
  if (reqParams.stageDetailId && reqParams.jobId && reqParams.stageId) {
    qryDelete +=
      "  stageDetailId = " +
      reqParams.stageDetailId +
      " AND stageId = " +
      reqParams.stageId +
      " AND jobId = " +
      reqParams.jobId;
  } else if(reqParams.stageId){
    qryDelete += " stageId = " + reqParams.stageId;
  }else if(reqParams.jobId){
    qryDelete += " jobId = " + reqParams.jobId;
  }

  console.log(qryDelete);
  try {
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
  } catch (err) {
    console.log("error: ", err);
  }
};


stageDetail.findById = (stageId, result) => {
  sql.query(`SELECT * FROM stageDetailTable WHERE stageId = ${stageId}`, (err, res) => {
    console.log("yahan aya");
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found stage: ", res);
      result(null, res);
      return;
    }

    // not found Stage detail with the Id
    result({ kind: "not_found" }, null);
  });
};






module.exports = stageDetail;
