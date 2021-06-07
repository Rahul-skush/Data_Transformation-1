module.exports = app => {
  const stageDetail = require("../controllers/stageDetail.controller.js");

  // Create a new stageDetails in job
  app.post("/stageDetail", stageDetail.createStage);

  // get all stageDetails
  app.get("/stageDetail", stageDetail.getAll);

  // update Stage Detail
  app.put("/stageDetail/:jobId/:stageId/:stageDetailId", stageDetail.updateStageDetail);
  // delete
};
