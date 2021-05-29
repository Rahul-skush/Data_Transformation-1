import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Stages(props) {
    const [stages, setStages] = useState(["Stage_1", "Stage_2", "Stage_3"]);
    const [newStage, setNewStage] = useState();


    return (
        <div>
           <label>
            Choose a stage from this list:
            <input list="stages" name={newStage} onChange={(e)=>{setNewStage(e.target.value)}}/>  
            {/* <button onClick= {handleChangeAdd}>Add</button> */}
           </label>   
            <datalist id="stages">
                {stages.map((stage, key)=>{
                return  <option key = {key} value = {stage} />;
                })}   
            </datalist>
        </div>
    )
}

export default Stages
