
const Stage = require("../models/stage.model.js");


// create all stages
exports.createAllStages = async (req, res, next) => {
  console.log(req.body.data)
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
      name: findStage[stageName],
      jobId: jId
    };
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

// Create and Save a new stage
exports.create = (req, res) => {
  // Validate request

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a stage
  const stage = new Stage({
    name: req.body.name,
    jobId: req.body.jobId,
  });
  console.log(stage);
  // Save stage in the database
  Stage.create(stage, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the jaob.",
      });
    else res.send(data);
  });
};

// Retrieve all stages from the database.
exports.findAll = (req, res) => {
  Stage.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Stages.",
      });
    else res.send(data);
  });
};

// Find a single Stage with a id
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

// Update a stage identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);

  Stage.updateById( req.body, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not foundStage with id ${req.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating stage with id " + req.id,
        });
      }
    } else res.send(data);
  });
};

// Delete a stage and stageDetails with the specified id in the request
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

