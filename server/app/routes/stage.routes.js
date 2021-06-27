module.exports = app => {
  const stages = require("../controllers/stage.controller.js");
  const stageDetail = require("../controllers/stageDetail.controller.js");
  // Create a new Stage
  app.post("/stages", stages.create);

  // Retrieve all Stages
  app.get("/stages", stages.findAll);

  // Retrieve a single Stage with stageId
  app.get("/stages/:jobId", stages.findOne);

  // Update a Stage with stageId
  app.put("/stages/", stages.update);

  // Delete a Stage with stageId
  app.delete("/stages/:stageId", stages.delete, stageDetail.delete);

  // Create a new Stage
  app.delete("/stages/remove/:jobId", stages.deleteAll);
  //remove all stages
  app.delete("/stages/remove/", stages.deleteAllStages);
};