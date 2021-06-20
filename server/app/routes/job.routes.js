module.exports = app => {
  const jobs = require("../controllers/job.controller.js");
  const stages = require("../controllers/stage.controller.js");
  const stageDetail = require("../controllers/stageDetail.controller.js");

  // Create a new Job
  app.post("/jobs", jobs.create);

  // Retrieve all Jobs
  app.get("/jobs", jobs.findAll);

  // Retrieve a single Job with jobId
  app.get("/jobs/:jobId", jobs.findOne);

  // Update a Job with jobId
  app.put("/jobs/:jobId", jobs.update);

  // Delete a Job with jobId
  app.delete("/jobs/:jobId", jobs.delete, stages.deleteAll, stageDetail.delete);

  // Create a new Job
  //Need to del all stages and stageDetails as well
  app.delete("/jobs/remove", jobs.deleteAll);


};