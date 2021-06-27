const sql = require("./db.js");
const tableConfig = require("../config/table.config.js");

// constructor (for testing)
const Stage = function (stage) {
  this.stageName = stage.stageName;
  this.jobId = stage.jobId;
  // this.stageId = stage.stageId;
};

Stage.create = (newStage, result) => {
  sql.query(`INSERT INTO ${tableConfig.STAGES} SET ?`, newStage, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created stage: ", { Id: res.insertId, ...newStage });
    //console.log(res.insertId)

    result(null, { Id: res.insertId, ...newStage });
  });
};

Stage.findById = (jobId, result) => {
  sql.query(
    `SELECT * FROM ${tableConfig.STAGES} WHERE jobId = ${jobId}`,
    (err, res) => {
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
    }
  );
};

Stage.getAll = (result) => {
  sql.query(`SELECT * FROM ${tableConfig.STAGES}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("stages: ", res);
    result(null, res);
  });
};

Stage.updateById = (stage, result) => {
  sql.query(
    `UPDATE ${tableConfig.STAGES} SET stageName = ? WHERE stageId = ?`,
    [stage.stageName, stage.stageId],
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

      console.log("updated stage: ", { ...stage });
      result(null, { ...stage });
    }
  );
};

Stage.remove = (stageId, result) => {
  sql.query(
    `DELETE FROM ${tableConfig.STAGES} WHERE stageId = ?`,
    stageId,
    (err, res) => {
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
    }
  );
};

Stage.removeAll = (jobId, result) => {
  sql.query(
    `DELETE FROM ${tableConfig.STAGES} WHERE jobId = ?`,
    jobId,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log(`deleted ${res.affectedRows} stages`);
      result(null, res);
    }
  );
};

Stage.removeAllStages = (result) => {
  sql.query(`DELETE FROM ${tableConfig.STAGES}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} stages`);
    result(null, res);
  });

  Stage.createStage = (newStage, result) => {
    sql.query("INSERT INTO stages SET ?", newStage, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created stage: ", { Id: res.insertId, ...newStage });
      console.log(res.insertId);
      newStage.stageId = res.insertId;

      result(null, { Id: res.insertId, ...newStage });
    });
  };
};

module.exports = Stage;
