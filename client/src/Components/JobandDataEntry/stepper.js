import React, { Fragment, useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


 import AddJob from './AddJob'
import FileUpload from './FileUpload'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Add Job', 'Upload File'];
}



var jobId;

export default function HorizontalLabelPositionBelowStepper() {
  //
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const[next, setNext]= useState(1);
  const[addAnotherJob, setaddAnotherJob]= useState(1);

  const handleCallBack=(id)=>{jobId= id;
    setNext(0);
  
  console.log(jobId)
  }







const handleEndGame=()=>{
  
  setaddAnotherJob(0)
}

// useEffect(() => {
//   handleNext()=>{  setNext(1);
//     setaddAnotherJob(1);}

//   return () => {
//     // cleanup
//   }
// }, [])


  function getStepContent(stepIndex) {
  
    switch (stepIndex) {
      case 0:
        return <AddJob getJobId={handleCallBack} />
      case 1:
        return <FileUpload id={jobId} settingFinish={handleEndGame} />
     
      default:
        return 'Unknown stepIndex';
    }
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setNext(1);
    setaddAnotherJob(1);
  };

  
  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length-1 ? (
    
<div>
<Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
<div>
  <Button
    disabled={activeStep === 0}
    onClick={handleBack}
    className={classes.backButton}
  >
    Back
  </Button>
  <Button variant="contained" color="primary" onClick={handleReset} disabled= {addAnotherJob}>
    {/* {activeStep === steps.length - 1 ? 'Finish' : 'Next'} */}
    Add New Job
  </Button>
</div>
</div>

        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext} disabled= {next}>
                {/* {activeStep === steps.length - 1 ? 'Finish' : 'Next'} */}
                Upload File
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
