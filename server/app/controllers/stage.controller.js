const Stage = require("../models/stage.model.js");


// create all stages

exports.createAllStages = async (req, res, next) => {
  console.log(req.body.data)
  // const stages = req.body.fileData;
  //console.log(stages)
  const jId = req.body.jobId
const stages=req.body.data
  const findStage = [];
  const stageNames = [];
  for (name in stages) {
    findStage.push(name);
  }

  if (findStage.length == 0) return;
  for (stageName in findStage) {
    var stageEntry = {
      stageName: findStage[stageName],
      jobId: jId,
      // jobId: req.body.jobId,
    };
    // req.body.findStage[stageName].stageId = 303;
    await Stage.create(stageEntry, (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Some error occurred while creating the job.",
        });
      stageNames.push(data);
      if (stageNames.length === findStage.length) {
        res.locals.stages = stageNames;
        next();
      }
    });
  }
};

// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Customer
  const stage = new Stage({
    stageName: req.body.stageName,
    jobId: req.body.jobId,
  });
  console.log(stage);
  // Save Customer in the database
  Stage.create(stage, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the jaob.",
      });
    else res.send(data);
  });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  Stage.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Stages.",
      });
    else res.send(data);
  });
};

// Find a single Stage with a customerId
exports.findOne = (req, res) => {
  Stage.findById(req.params.jobId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found stage with job id ${req.params.jobId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving stage with job id " + req.params.jobId,
        });
      }
    } else res.send(data);
  });
};

// Update a stage identified by the stageId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);

  Stage.updateById(req.params.stageId, req.body, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not foundStage with id ${req.params.stageId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating stage with id " + req.params.stageId,
        });
      }
    } else res.send(data);
  });
};

// Delete a stage and stageDetails with the specified stageId in the request
exports.delete = async (req, res, next) => {
  Stage.remove(req.params.stageId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not foundStage with id ${req.params.stageId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not deleteStage with id " + req.params.stageId,
        });
      }
    }
    //delete karenge
    else {
      next();
    }
  });
};





// Delete allStages from the database.
exports.deleteAll = (req, res, next) => {
  Stage.removeAll(req.params.jobId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Stages.",
      });
    else {
      next();
     // res.send({ message: `All Stages were deleted successfully!` });
    }
  });
};

//delete all stages
exports.deleteAllStages = (req, res) => {
  Stage.removeAllStages((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Stages.",
      });
    else res.send({ message: `All Stages were deleted successfully!` });
  });
};



