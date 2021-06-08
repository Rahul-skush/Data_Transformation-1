import { Checkbox } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Stages(props) {
    const [stages, setStages] = useState([]);
    const [stageId, setStageId] = useState();
    const [newStage, setNewStage] = useState();
    const [updateStage, setUpdateStage] = useState(false);
    const [ checkedA, setCheckedA] = useState(false);
   let index = "";
    useEffect(  () => {
        axios.get(`http://localhost:3000/stages/${props.jobId}`).then((res)=>{
                setStages(res.data);
                console.log(stages);
            }
        ).catch((err)=>console.log(err))
    }, [])
    
    
    console.log("here is job Id"+ props.jobId); //show
    const handleChangeAdd = ()=>{
        setStages([...stages, {"stageName" : newStage, "jobId": props.jobId}]);
       axios.post(`http://localhost:3000/stages`, { "stageName" : newStage, "jobId": props.jobId} ).then((res)=>{
            alert("Added a new stage named "+ newStage + " in the job");
        }).catch((err)=>{console.log(err);})
    }

    const handleChangeUpdate = ()=>{
        if(updateStage===false)
        {   setUpdateStage(true); }
        else
        {
            axios.put(`http://localhost:3000/stages/${stageId}`, { "stageName" : newStage}).then((res)=>{
                alert("successfully updated the name of the stage to "+ newStage);
                stages.splice(index,1);
                stages.push({"Id" : stageId, "stageName" : newStage, "jobId" : props.jobId});
            }).catch((err)=>{console.log(err)});
            setUpdateStage(false);
        }
    }
    
    const handleChangeRemoveAll = ()=>{
        axios.delete(`http://localhost:3000/stages/remove/${props.jobId}`).then((res)=>{
            alert("Successfully removed all stages!!");
            setStages([]);
            setNewStage("");
        }).catch((err)=>console.log(err));
    }

    const handleChangeRemove = ()=>{
      stages.splice(index,1);
        console.log(newStage);
        console.log("stage id is "+ stageId);
        axios.delete(`http://localhost:3000/stages/${stageId}`).then((res)=>{
            alert("Successfully removed " + newStage );
                console.log("the stage Id"+ stageId + " is deleted");
            }).catch((err)=>{
            console.log(err);
        })  
    }
    const findStageId = ()=>{
        var i = 0;
        for(;i<stages.length;i++)
        if(stages[i].stageName===newStage) {setStageId(stages[i].stageId); break;}
        return i;
    }

    console.log("stage id is "+ stageId);
    
    const handleOnChangeNewStage = (e)=>{
        setCheckedA(false);
        e.preventDefault();
        setNewStage(e.target.value);
    }

    const handleChange = ()=>{
        if(newStage!=="")
        {setCheckedA(true);
        index =  findStageId();}
    }

    return (
        <div>
           <label>
            Choose a stage from this list:
            <input list="stages" name={newStage} onChange={handleOnChangeNewStage} placeholder="...Search Stage here..."/>
            <Checkbox checked = {checkedA} onChange={handleChange} name="checkedA" color="primary"/> 
            {updateStage?<input placeholder="new stage name" value ={newStage} onChange={(e)=>setNewStage(e.target.value)}/>:null}  
            <button onClick= {handleChangeAdd}>Add</button>
            <button onClick= {handleChangeUpdate}>{updateStage===false?<bold>update stage name</bold>:<bold>update</bold>}</button>
            <button onClick= {handleChangeRemove}>Remove</button>
            <button onClick= {handleChangeRemoveAll}>Remove All stages</button>
           </label>   
            <datalist id="stages">
                {
                stages.length?
                stages.map((item)=>{
                return  <option key = {item.stageId} value = {item.stageName} />;
                }):
                null}   
            </datalist>
        </div>
    )
}

export default Stages
