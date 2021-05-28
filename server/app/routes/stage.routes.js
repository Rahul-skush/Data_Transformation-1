module.exports = app => {
  const stages = require("../controllers/stage.controller.js");

  // Create a new Stage
  app.post("/stages", stages.create);

  // Retrieve all Stages
  app.get("/stages", stages.findAll);

  // Retrieve a single Stage with stageId
  app.get("/stages/:stageId", stages.findOne);

  // Update a Stage with stageId
  app.put("/stages/:stageId", stages.update);

  // Delete a Stage with stageId
  app.delete("/stages/:stageId", stages.delete);

  // Create a new Stage
  app.delete("/stages", stages.deleteAll);
};