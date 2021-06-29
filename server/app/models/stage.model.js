
const sql = require("./db.js");
const tableConfig = require("../config/table.config.js");

// constructor 
const Stage = function (stage) {
  this.name = stage.name;
  this.jobId = stage.jobId;
};

Stage.create = (newStage, result) => {
  sql.query(`INSERT INTO ${tableConfig.STAGES} SET ?`, newStage, (err, res) => {
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
    `UPDATE ${tableConfig.STAGES} SET name = ? WHERE id = ?`,
    [stage.name, stage.id],
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
    `DELETE FROM ${tableConfig.STAGES} WHERE id = ?`,
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
};

module.exports = Stage;

