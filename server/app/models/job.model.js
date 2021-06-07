const sql = require("./db.js");

// constructor
const Job = function(job) {
  this.name = job.name;
  this.description = job.description;
  this.Id = job.Id;
};

Job.create = (newJob, result) => {
  sql.query("INSERT INTO jobs SET ?", newJob, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created job: ", { Id: res.insertId, ...newJob });
    result(null, { Id: res.insertId, ...newJob });
  });
};

Job.findById = (jobId, result) => {
  sql.query(`SELECT * FROM jobs WHERE Id = ${jobId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found job: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Job with the Id
    result({ kind: "not_found" }, null);
  });
};

Job.getAll = result => {
  sql.query("SELECT * FROM jobs", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("jobs: ", res);
    result(null, res);
  });
};

Job.updateById = (Id, job, result) => {
  sql.query(
    "UPDATE jobs SET name = ? WHERE Id = ?",
    [job.name, Id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found job with the Id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated job: ", { Id: Id, ...job });
      result(null, { Id: Id, ...job });
    }
  );
};

Job.remove = (Id, result) => {
  sql.query("DELETE FROM jobs WHERE Id = ?", Id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Jobs with the Id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted job with Id: ", Id);
    result(null, res);
  });
};

Job.removeAll = result => {
  sql.query("DELETE FROM jobs", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} jobs`);
    result(null, res);
  });
};

module.exports = Job;