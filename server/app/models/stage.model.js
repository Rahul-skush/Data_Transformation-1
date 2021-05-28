const sql = require("./db.js");

// constructor
const Stage = function(stage) {
  this.name = stage.name;
 
  
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

Stage.findById = (stageId, result) => {
  sql.query(`SELECT * FROM stages WHERE Id = ${stageId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found stage: ", res[0]);
      result(null, res[0]);
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

Stage.updateById = (Id, stage, result) => {
  sql.query(
    "UPDATE stages SET name = ?, description = ? WHERE Id = ?",
    [stage.email, stage.name, Id],
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

      console.log("updated stage: ", { Id: Id, ...stage });
      result(null, { Id: Id, ...stage });
    }
  );
};

Stage.remove = (Id, result) => {
  sql.query("DELETE FROM stages WHERE Id = ?", Id, (err, res) => {
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

    console.log("deleted stage with Id: ", Id);
    result(null, res);
  });
};

Stage.removeAll = result => {
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