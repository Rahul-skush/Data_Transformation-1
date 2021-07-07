
module.exports = app => {
    const jobs = require("../controllers/job.controller.js");
    const stages = require("../controllers/stage.controller.js");
    const stageDetail = require("../controllers/stageDetail.controller.js");
  
    // Create a new Job
    app.post("/jobs", jobs.create);

    //Posting json data in job table
  app.post("/jobs/data", jobs.addData)

    // Retrieve all Jobs
    app.get("/jobs", jobs.findAll);
  
    // Retrieve a single Job by jobId
    app.get("/jobs/:jobId", jobs.findOne);
  
    // Update a Job by jobId 
    app.put("/jobs/:jobId", jobs.update, jobs.updateJson);
  
    // Delete a Job by jobId followed by deletion of corresponding stages and stagsDetails
    app.delete("/jobs/:jobId", jobs.delete, stages.deleteAll, stageDetail.delete);
  
    // Delete all Jobs
    app.delete("/jobs/remove", jobs.deleteAll);


  };
