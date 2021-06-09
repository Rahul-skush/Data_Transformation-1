const stageDetail = require("../models/stageDetail.model.js");
const stagesController = require("./stage.controller");



// create stage ******************************

exports.createStage = async (req, res) => {
  // Validate request ----------------------------
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const stages = req.body;
 // console.log(stages);
  
    //create stage table ----------------------------------
   // await jobController.createJob(jobName);
    // const createStage =  await  stageDetail.createStage("stage_table");

    // find stage name -----------------------------------
  const findStage= [];
  for(name in stages) {
    findStage.push(name);
  }
  
   // create stageDetail ------------------------
  try{
    var k =101;
    for(var i=0; i<findStage.length; i++) {
      for(var j=0; j<findStage[i].length; j++){
      await insertFunction(stages[findStage[i]][j], j, k, 1);
      }
      k++;
    }
    res.status(200).send({
      message: "entery successfully"
    })} catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while entering stage details all Stages."
    });
  }
};

// **********************************

// ********************get all stageDetails ***************************
exports.getAll = async(req, res, next)=>{
  try{
    await stageDetail.getAll(req, (err,data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving stageDetails."
          });
        else res.send(data);
      });
    }catch (err) {
      console.log(err);
    }
}
// **************************END of get all stageDetails*******************************

//  *************************update stageDetails***************************************
exports.updateStageDetail = async (req, res, next)=>{
  if (!req.params.stageDetailId || !req.params.stageId || !req.params.jobId || !req.body) {
    res.status(400).send({
      message: "stageDetailId  can not be empty!"
    });
}

try{
  const deleteStageDetail = await deleteFunction(req.params, res);
  const insertUpdates = await insertFunction(req.body, req.params.stageDetailId, req.params.stageId, req.params.jobId);
  }catch(err){
    console.log(err);
  }
}
// ************************END of update stageDetails****************************************

//  *************************delete stageDetails***************************************
exports.delete = (req, res) => {
  deleteFunction(req.params, res);
 };
// ***************************END of delete stageDetails*************************************


// *************************** helper functions*************************************

// insert stageDetails into table ---------------------
 const insertFunction= async (data, stageDetailId, stageId, jobId) => {
      try{
      for(column in data) {
        const stageRecordNew = {};
        stageRecordNew.jobId = jobId;
        stageRecordNew.stageId = stageId;
        stageRecordNew.stageDetailId =stageDetailId;
        stageRecordNew.property = column;
        stageRecordNew.property_value = data[column];
        //console.log("\nrecord == ", stageRecordNew);
        const createStageRecord =  await stageDetail.createStageRecord("stage_table", stageRecordNew);
         // Promise.all(createStageRecord);
      }
    } catch (err){
      console.log(err);
    }
 }

 // delete stageDetail --------------------------------
 const deleteFunction = async (reqParams, res) => {
    try{
      await stageDetail.remove(reqParams, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found stageDetail.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete stageDetail with "
          });
        }
      } else res.send({ message: `stageDetail was deleted successfully!` });
    });
  }catch(err) {
    console.log(err);
  }
}


//ishika ke controllers


