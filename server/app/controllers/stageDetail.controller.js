const stageDetail = require("../models/stageDetail.model.js");



// create stage

exports.createStage = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const stages = req.body;

  
    //create stage table
    const createStage =  await  stageDetail.createStage("stage_table");

    // find stage name
  const findStage= [];
  for(name in stages) {
    findStage.push(name);
  }

  try{
  var k =101;
  for(var i=0; i<findStage.length; i++) {
    for(var j=0; j<findStage[i].length; j++){
      // create stageDetail
      for(column in stages[findStage[i]][j]) {
        const stageRecordNew = {};
        stageRecordNew.jobId = 1;
        stageRecordNew.stageId = k;
        stageRecordNew.stageDetailId =j;
        stageRecordNew.property = column;
        stageRecordNew.property_value = stages[findStage[i]][j][column];
        console.log("\nrecord == ", stageRecordNew);
        const createStageRecord =  await stageDetail.createStageRecord("stage_table", stageRecordNew);
           Promise.all(createStageRecord);
      }
    }
    k++;
  }
  
  res.status(200).send({
    message: "entery successfully"
  })
  
 }
 catch (err) {
  res.status(500).send({
    message:
      err.message || "Some error occurred while entering stage details all Stages."
  });
}
};

exports.getAll = async(req, res, next)=>{
  stageDetail.getAll(req, (err,data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving stageDetails."
      });
    else res.send(data);
  });
}

exports.updateStageDetail = (req, res, next)=>{
  if (!req.params.stageDetailId || !req.params.stageId || !req.body) {
    res.status(400).send({
      message: "stageDetailId  can not be empty!"
    });
  }
}