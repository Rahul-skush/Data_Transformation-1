import React, { Fragment, useState } from 'react'

import axios from 'axios';
import TextField from '@material-ui/core/TextField';
const AddJob = (props) => {
  const [jobs, setJobs] = useState({ name: "", description: "" });

    const handleJobNameChange=(event)=>{
    console.log(event.target.value);
    const value_name=event.target.value;
    const name=event.target.name;
    console.log(value_name,name)
    setJobs((prevValue)=>{if(name==='jobName'){return{name:value_name,description:prevValue.description}}
    
    else{return{name:prevValue.name ,description:value_name}}
     })
    }


  const onSubmit = async e => {
    e.preventDefault();
    

    try {

        const res = await axios.post(`http://localhost:3000/jobs`,{"name":jobs.name,"description":jobs.description})

       console.log(res);

         props.getJobId(res.data.Id)

    } catch (err) {
  
    }



  };

  return (
    <Fragment>
 
      <form onSubmit={onSubmit}>
        <div className='custom-file mb-4'>

            <TextField id="outlined-basic"
                       label="Job Name" 
                       variant="outlined" 
                       name="jobName" 
                       required
                      onChange={handleJobNameChange}
                      value={jobs.name}
                
            />
            
        </div>


        <div>
            <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                variant="outlined"
                name="description"
                required
                onChange={handleJobNameChange}
                value={jobs.description}
             />
     
        </div>

        <input
          type='submit'
          value='Create Job'
          className='btn btn-primary btn-block mt-4'
        />
      </form>
    
    </Fragment>
  );
};

export default AddJob;
