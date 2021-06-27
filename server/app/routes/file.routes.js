module.exports = app => {
    const stages = require("../controllers/stage.controller.js");
    const stageDetail = require("../controllers/stageDetail.controller.js");
    const file= require("../controllers/file.controllers")
    // Create a new Stage
    app.post("/file", file.fileData);
 
  };