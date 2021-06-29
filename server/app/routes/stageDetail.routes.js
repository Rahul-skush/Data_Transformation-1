module.exports = (app) => {
  const stageDetail = require("../controllers/stageDetail.controller.js");
  const stages = require("../controllers/stage.controller.js");

  // Create stageDetails and stages sorresponding to a job from json data
  app.post( "/stageDetail", stages.createAllStages, stageDetail.createStage );

  // get all stageDetails
  app.get("/stageDetail", stageDetail.getAll);

  // update by jobId && stageId && stageDetailId
  app.put( "/stageDetail/:jobId/:stageId/:stageDetailId", stageDetail.updateStageDetail );
  
  // delete by jobId && stageId && stageDetailId
  app.delete("/stageDetail/:jobId/:stageId/:stageDetailId", stageDetail.delete);

  // getting all the stageDetails of a particular stage
  app.get("/stageDetail/:stageId",stageDetail.getDetailsOfStage) 

};
