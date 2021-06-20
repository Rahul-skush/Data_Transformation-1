import React,{useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';

import NewStageDetail from './NewStageDetails'
import axios from 'axios';


const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },

 

});














const Stage = (props) => {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
  console.log("**Checkin if it's reaching")
console.log(row)

const[rows,setRows]=useState(row);
// const[nameDisplay,setNameDisplay]=useState({"stageName":rows.name
// })
    
const deleteStage=(id)=>{
  console.log("del")
console.log(id)
axios.delete(`http://localhost:3000/stages/${id}`).then(()=>{setRows(null)})
  }

  // const updateStage=(row)=>{
  //   axios.put(`http://localhost:3000/stages/${row.Id}`,{"stageName":rows.name})
  //   row.stageName=rows.name
  // //  row.description=jobs.description
  //  console.log(row)
  //  setNameDisplay({"name":jobs.name
  // })
  // }
  
  // const deleteJob=(id)=>{console.log("del")
  // console.log(id)

  // const handleStageNameChange=(event)=>{
  //   console.log(event.target.value);
  //   const value_name=event.target.value;
  //   const name=event.target.name;
  //   console.log(value_name,name)
  //   setRows(()=>{if(name==='stageName'){return{stageName:value_name}}
  //   })
  //  }
      




return (

<div>{rows?
      <React.Fragment>
        <TableRow className={classes.root} className={classes.rowcolor}>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.stageName}
          </TableCell>

          {/* <TableCell><input type="text" placeholder = "Edit Stage Name" name="stageName" onChange={handleStageNameChange}></input>
               <button onClick={()=>updateStage(row)}>Update</button>
          </TableCell> */}



          <TableCell>
          <button onClick={()=>deleteStage(row.Id)}><DeleteOutlineRoundedIcon/></button>
          
        </TableCell>
        
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  Stage Detail
                </Typography>
                <Table size="small" aria-label="purchases">
                  {/* <TableHead>
                    <TableRow>
                      <TableCell>Property</TableCell>
                      <TableCell>Property Value</TableCell>
                      
                    </TableRow>
                  </TableHead> */}
                  <TableBody>
                   
<NewStageDetail key={row.Id} row={row}/>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>:null}</div>


    
    );
}

export default Stage
