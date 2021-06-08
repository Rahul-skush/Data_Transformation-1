import React, { useEffect, useState } from 'react'
import Stages from '../stagesUi/Stages';
import axios from "axios"
import Checkbox from '@material-ui/core/Checkbox';

function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [newJob, setNewJob] = useState();
    const [renderStage, setrenderStage] = useState(false);
    const [jobId, setJobId] = useState();
    const [updateJob, setUpdateJob] = useState(false);
    const [ checkedA, setCheckedA] = useState(false);
    let index = "";
    useEffect(() => {
        axios.get("http://localhost:3000/Jobs").then(
                (res)=>{
                    setJobs(res.data);
                })
    }, [])
    
    
    const handleChangeAdd = ()=>{
        setJobs([...jobs, {"name" : newJob, "description":"heloo there"}])
        axios.post(`http://localhost:3000/Jobs`, { "name" : newJob, "description":"heloo there"} )
    }
    const handleChangeRemove =()=>{
        jobs.splice(index, 1);
        
        axios.delete(`http://localhost:3000/Jobs/${jobId}`).then((res)=>{
            axios.delete(`http://localhost:3000/stages/remove/${jobId}`).then((res)=>{
            alert("Successfully removed the job!!");
        }).catch((err)=>console.log(err));
        })
    }
    const handleChangeUpdate = ()=>{
        if(updateJob===false){
            setUpdateJob(true);
        }
        else{
            axios.put(`http://localhost:3000/jobs/${jobId}`, { "name" : newJob}).then((res)=>{
                alert("successfully updated the name of the job to "+ newJob);
                updateJobState(index);
            }).catch((err)=>{console.log(err)});
            setUpdateJob(false);
        }
    }
    const handleChangeRemoveAll = ()=>{
        axios.delete(`http://localhost:3000/jobs/remove`).then((res)=>{
            axios.delete(`http://localhost:3000/stages/remove`).then((res)=>{
                alert("Successfully removed all jobs!!");
                setJobs([]);
                setNewJob("");
            }).catch((err)=>{console.log(err)})   
        }).catch((err)=>console.log(err));
    }

    const findJobId = ()=>{
        var i=0;
        for(;i<jobs.length;i++)
        if(jobs[i].name===newJob) {setJobId(jobs[i].Id); break;}
        return i;
    }

    const updateJobState = (index)=>{
        const desc = jobs[index].description;
        jobs.splice(index, 1);
        setJobs([...jobs, {"Id":jobId, "Name":newJob, "Description":desc}]);
    }
   
    const handleOnChangeNext = ()=>{
        setrenderStage(true);
    }
    const handleOnChangeInput = (e)=>{
        setCheckedA(false);
        setNewJob(e.target.value);
       // findJobId();
    }

    const handleChange = ()=>{
        if(newJob!=="")
        {setCheckedA(true);
       index =  findJobId();}
    }
    const renderCrud = (props)=>{
        
    } 
    return (
        <div>
           <label>
            Choose a job from this list:
            <input list="jobs" name= {newJob} value = {newJob} onChange={handleOnChangeInput} placeholder="...Search Job here..."/>
            <Checkbox checked = {checkedA} onChange={handleChange} name="checkedA" color="primary"/> 
            {updateJob?<input placeholder="new stage name" value ={newJob} onChange={(e)=>setNewJob(e.target.value)}/>:null}  
                <button onClick= {handleChangeAdd}>Add</button>
                <button onClick= {handleChangeUpdate}><bold>{updateJob===false?"update job name":"update"}</bold></button>
                <button onClick= {handleChangeRemove}>Remove</button>
                <button onClick= {handleChangeRemoveAll}>Remove All jobs</button>
                <button onClick={handleOnChangeNext}>Next</button>
            
           </label>     
            <datalist id="jobs" >
                {jobs.map((item)=>{
                return  <option key = {item.Id} value = {item.name} />;
                })}   
            </datalist>
            {renderStage?<Stages jobId = {jobId}/>:null}
        </div>
    )
}



export default Jobs
