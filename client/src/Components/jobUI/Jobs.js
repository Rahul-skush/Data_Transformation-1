import React, { useState } from 'react'

function Jobs() {
    const [jobs, setJobs] = useState(["Job_1", "Job_2", "Job_3"]);
    const [newJob, setNewJob] = useState();
    const handleChangeAdd = ()=>{
        setJobs([...jobs, newJob]);
    }
    return (
        <div>
           <label>
            Choose a job from this list:
            <input list="jobs" name={newJob} onChange={(e)=>{setNewJob(e.target.value)}}/>  
            <button onClick= {handleChangeAdd}>Add</button>
           </label>   
            <datalist id="jobs">
                {jobs.map((job, key)=>{
                return  <option key = {key} value = {job} />;
                })}   
            </datalist>
        </div>
    )
}

export default Jobs
