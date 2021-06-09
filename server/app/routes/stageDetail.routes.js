module.exports = app => {
  const stageDetail = require("../controllers/stageDetail.controller.js");
  const stagesController = require("../controllers/stage.controller.js");
  const jobsController = require("../controllers/job.controller.js");

  // Create a new stageDetails in job
  app.post("/stageDetail", stagesController.createAllStages, stageDetail.createStage);

  // get all stageDetails
  app.get("/stageDetail", stageDetail.getAll);

  // update Stage Detail
  app.put("/stageDetail/:jobId/:stageId/:stageDetailId", stageDetail.updateStageDetail);
  // delete
  app.delete("/stageDetail/:jobId/:stageId/:stageDetailId", stageDetail.delete);
};
