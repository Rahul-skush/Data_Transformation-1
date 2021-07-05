
const Job = require("../models/job.model.js");


// Create and Save a new job
exports.create =  (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a job
  const job = new Job({
    name: req.body.name,
    description: req.body.description,
    
  });

  // Save job in the database
  Job.create(job, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the jaob."
      });
    else res.send(data);
  });
};


exports.addData = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
 
  Job.addData(req.body, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the jaob."
      });
    else res.send(data);
  });
};



exports.updateJson = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
 
  Job.updateJson(req.params.jobId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the jaob."
      });
    else {
    console.log("Reached here")
  res.send(data)}
  });
};


// Retrieve all jobs from the database.
exports.findAll = (req, res) => {
  Job.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Jobs."
      });
    else res.send(data);
  });
};

// Find a single Job with a jobId
exports.findOne = (req, res) => {
  Job.findById(req.params.jobId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found job with id ${req.params.jobId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving job with id " + req.params.jobId
        });
      }
    } else res.send(data);
  });
};

// Update a job identified by the jobId in the request
exports.update = async(req, res,next) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

 Job.updateById(
    req.params.jobId,
    req.body,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not foundJob with id ${req.params.jobId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating job with id " + req.params.jobId
          });
        }
      } else {console.log(data);
      next();};
    }
  );
};

// Delete a job with the specified jobId in the request
exports.delete = (req, res, next) => {
 Job.remove(req.params.jobId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not foundJob with id ${req.params.jobId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not deleteJob with id " + req.params.jobId
        });
      }
    } else {
      next();
    }
  });
};

// Delete allJobs from the database.
exports.deleteAll = (req, res) => {
  Job.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Jobs."
      });
    else res.send({ message: `All Jobs were deleted successfully!` });
  });
};

