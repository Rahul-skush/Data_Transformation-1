import React, { useEffect, useState } from 'react'
import Stages from '../stagesUi/Stages';
import axios from "axios"

function Jobs() {
    const [jobs, setJobs] = useState(["Job_1", "Job_2", "Job_3"]);
    useEffect(() => {
        axios.get("http://localhost:3000/Jobs").then(
                (res)=>{
                    setJobs(res.data);
                })
    }, [])
    
    const [newJob, setNewJob] = useState();
    const [renderStage, setrenderStage] = useState(false)
    const handleChangeAdd = ()=>{
        axios.post(`http://localhost:3000/Jobs`, { "name" : newJob, "description":"heloo there"} )
    }

    const handleOnChangeNext = ()=>{
        console.log("this is selected :" +newJob);
        setrenderStage(true);
    }
    return (
        <div>
           <label>
            Choose a job from this list:
            <input list="jobs" name={newJob} onChange={(e)=>{setNewJob(e.target.value)}} placeholder="...Search Job here..."/>  
            <button onClick= {handleChangeAdd}>Add</button>
            <button onClick={handleOnChangeNext}>Next</button>
           </label>   
            <datalist id="jobs">
                {jobs.map((item)=>{
                return  <option key = {item.Id} value = {item.name} />;
                })}   
            </datalist>
            {renderStage?<Stages name = {newJob}/>:null}
        </div>
    )
}

export default Jobs
