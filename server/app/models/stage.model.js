const sql = require("./db.js");

// constructor
const Stage = function(stage) {
  this.stageName = stage.stageName;
  this.jobId = stage.jobId;
  this.stageId = stage.stageId;
};

Stage.create = (newStage, result) => {
  sql.query("INSERT INTO stages SET ?", newStage, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created stage: ", { Id: res.insertId, ...newStage });
    result(null, { Id: res.insertId, ...newStage });
  });
};

Stage.findById = (jobId, result) => {
  sql.query(`SELECT * FROM stages WHERE jobId = ${jobId}`, (err, res) => {
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

    // not found Stage with the Id
    result({ kind: "not_found" }, null);
  });
};

Stage.getAll = result => {
  sql.query("SELECT * FROM stages", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("stages: ", res);
    result(null, res);
  });
};

Stage.updateById = (stageId, stage, result) => {
  sql.query(
    "UPDATE stages SET stageName = ? WHERE stageId = ?",
    [stage.stageName, stageId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found stage with the Id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated stage: ", { Id: stageId, ...stage });
      result(null, { Id: stageId, ...stage });
    }
  );
};

Stage.remove = (stageId, result) => {
  sql.query("DELETE FROM stages WHERE stageId = ?", stageId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Stages with the Id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted stage with Id: ", stageId);
    result(null, res);
  });
};

Stage.removeAll = (jobId, result) => {
  sql.query("DELETE FROM stages WHERE jobId = ?", jobId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} stages`);
    result(null, res);
  });
};

Stage.removeAllStages = (result) => {
  sql.query("DELETE FROM stages", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} stages`);
    result(null, res);
  });
};

module.exports = Stage;