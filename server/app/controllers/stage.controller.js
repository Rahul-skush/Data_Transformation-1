const Stage = require("../models/stage.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const stage = new Stage({
    name: req.body.name,
    
    
  });

  // Save Customer in the database
  Stage.create(stage, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the jaob."
      });
    else res.send(data);
  });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  Stage.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Stages."
      });
    else res.send(data);
  });
};

// Find a single Stage with a customerId
exports.findOne = (req, res) => {
  Stage.findById(req.params.stageId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found stage with id ${req.params.stageId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving stage with id " + req.params.stageId
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
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

 Stage.updateById(
    req.params.stageId,
    newStage(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not foundStage with id ${req.params.stageId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating stage with id " + req.params.stageId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a stage with the specified stageId in the request
exports.delete = (req, res) => {
 Stage.remove(req.params.stageId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not foundStage with id ${req.params.stageId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not deleteStage with id " + req.params.stageId
        });
      }
    } else res.send({ message: `stage was deleted successfully!` });
  });
};

// Delete allStages from the database.
exports.deleteAll = (req, res) => {
  Stage.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Stages."
      });
    else res.send({ message: `All Stages were deleted successfully!` });
  });
};
