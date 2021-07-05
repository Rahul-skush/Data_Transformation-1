
module.exports = app => {
  const stages = require("../controllers/stage.controller.js");
  const stageDetail = require("../controllers/stageDetail.controller.js");

  // Create a new Stage
  app.post("/stages", stages.create);

  // Retrieve all Stages
  app.get("/stages", stages.findAll);

  //Retrieve Stages by jobId
  app.get("/stages/:jobId", stages.findOne);

  // Update a Stage by stageId
  app.put("/stages", stages.update);

  // Delete a Stage by stageId
  app.delete("/stages/:stageId", stages.delete, stageDetail.delete);

  // delete all stages by jobId
  app.delete("/stages/remove/:jobId", stages.deleteAll);
  
  // remove all stages from table
  app.delete("/stages/remove/", stages.deleteAllStages);





};