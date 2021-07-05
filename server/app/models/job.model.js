
const sql = require("./db.js");
const tableConfig = require("../config/table.config.js");

// constructor
const Job = function (job) {
  this.name = job.name;
  this.description = job.description;
  
};

Job.create = (newJob, result) => {
  sql.query(`INSERT INTO ${tableConfig.JOBS} SET ?`, newJob, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created job: ", { Id: res.insertId, ...newJob });
    result(null, { Id: res.insertId, ...newJob });
  });
};


Job.addData = (Body,result) => {
 
const d = JSON.stringify(Body.data)
  sql.query(`UPDATE ${tableConfig.JOBS} set data = ? WHERE id = ?`,[d, Body.jobId], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
  
    console.log("created job: ",{...Body});
    result(null);
  });
};



Job.findById = (jobId, result) => {
  sql.query(
    `SELECT * FROM ${tableConfig.JOBS} WHERE id = ${jobId}`,
    (err, res) => {
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
      result({ kind: "not_found" }, null);
    }
  );
};

Job.getAll = (result) => {
  sql.query(`SELECT * FROM ${tableConfig.JOBS}`, (err, res) => {
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
    `UPDATE ${tableConfig.JOBS} SET name = ?, description = ?, updatedOnDate = ?, updatedByUser = ? WHERE id = ?`,
    [job.name, job.description, job.updatedOnDate, job.updatedByUser, Id],
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
  sql.query(`DELETE FROM ${tableConfig.JOBS} WHERE id = ?`, Id, (err, res) => {
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

Job.removeAll = (result) => {
  sql.query(`DELETE FROM ${tableConfig.JOBS}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} jobs`);
    result(null, res);
  });
};



Job.updateJson = (jobId, result) => {

  let key = [];
  sql.query(
    `SELECT name,property,property_value,stageDetailId FROM stages INNER JOIN stagedetailtable ON stages.id = stagedetailtable.stageId WHERE stages.jobId = ${jobId}`,
    
    (err, res) => {
      
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        //console.log("found stage: ", res);
        const results = res.map((v) => Object.assign({}, v));
        //console.log(results)
        key = [...new Set(results.map((item) => item.name))];
        console.log(key);
        const grouped = Object.values(
          results.reduce((r, o) => {
            (r[o.name] = r[o.name] || []).push(o);
            return r;
          }, {})
        );
       
        var ab=[]
        var cd=[]
       
        //  console.log(grouped.length);
        for (group in grouped) {
          // console.log(grouped[group])
          grouping = Object.values(
            grouped[group].reduce((r, o) => {
              (r[o.stageDetailId] = r[o.stageDetailId] || []).push(o);
              return r;
            }, {})
          );
         
          for (var i = 0; i < grouping.length; i++) {
      
            const p = grouping[i].reduce(
              (acc, cur) => ({
                ...acc,
                [cur.property]: cur.property_value.replace(/\\n/g, ''),
              }),
              {}
            );
         
const str = JSON.stringify(p)


         ab.push(p)
            }
          cd.push(ab);

        ab=[];}
       
        console.log(cd)
     

var resu =  cd.reduce(function(resu, field, index) {
  resu[key[index]] = field;
  return resu;
}, {})

console.log(resu);
const data=JSON.stringify(resu)
console.log(JSON.stringify(resu))
 const jsonData ={"jobId":jobId,
"data":data}
Job.addData(jsonData, (err, data) => {
  if (err)
   console.log({
      message:
        err.message || "Some error occurred while creating the jaob."
    });
  else console.log("reached");
});

       return;
      }

      // not found Stage with the Id
      result({ kind: "not_found" }, null);
    }
  );
};








module.exports = Job;

