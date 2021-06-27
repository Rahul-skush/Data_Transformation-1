import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import axios from "axios";

import StageDetailList from "./StageDetailList";


const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },

  head: {
    backgroundColor: "#cfd8dc",
  },

  stage: {
    backgroundColor: "#747c82",
  },
});

const Stages = (props) => {
  console.log("\n\n\n\n");
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  console.log("Checking props");
  console.log(row);

  const [user, setUser] = useState([]);
  const [fetchingUser, setFetchingUser] = useState(true);
  const [noError, setNoError] = useState(false);
  const [jobs, setJobs] = useState(row);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/stages/${row.Id}`,
          {}
        );

        if (fetchingUser) {
          const data = await response.json();
          setUser(data);
        }

        setFetchingUser(false);
      } catch {
        setNoError(false);
      }
    };

    fetchUser();
  }, []);

 

  const deleteJob = (id) => {
    console.log("del");
    console.log(id);
    axios.delete(`http://localhost:3000/jobs/${id}`).then(() => {
      setJobs(null);
    });
  }; 

  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey : null
});
const [saveStatus, setSaveStatus] = useState(false);
const [cancelStatus, setCancelStatus] = useState(false);

const onEdit = (Id) => {
setInEditMode({
    status: true,
    rowKey:Id
})
}
const [rowData, setRowData] = useState(row);

const onSave = () => {
  setSaveStatus(true);
  var date = new Date();
var json = JSON.stringify(date);
json = JSON.parse(json);
   rowData.updatedOnDate = json;
  rowData.updatedByUser = "Rahul singh";
  if(rowData.name !== row.name || rowData.description !== row.description)
  updateInventory(rowData);
  onCancel(1 );
}

const onCancel = (check) => {
  //reset the inEditMode state value
  setInEditMode({
      status: false,
      rowKey: null
  })
  setCancelStatus(true);
  
  if(check===0){
    setRowData(row);
  }
}




const updateInventory = (data) => {
  console.log(data)
    axios.put(`http://localhost:3000/jobs/${data.Id}`, data)
        .then(response => console.log("dasdasdsa", response))
        .then(json => {
            // reset inEditMode 
           // onCancel(1);
            // fetch the updated data
        })
}

return (
  <React.Fragment>
  
    {jobs ? (
      <React.Fragment>
      <TableRow className={classes.head}>
          <TableCell  component="th" scope="row"  align="left">
      <IconButton
          aria-label="expand row"
          size="small"
          onClick={() => setOpen(!open)}
        >
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          <Tooltip title= {inEditMode.status && inEditMode.rowKey === row.Id? "Cancel":"Edit"}>
                   <FormControlLabel
                   control={
                     <Checkbox
                       checked={inEditMode.status}
                       style={{marginLeft: 8}}
                       onChange={() => { inEditMode.status && inEditMode.rowKey === row.Id? onCancel(0):onEdit(row.Id)}}
                       name="checkedA"
                       color="primary"
                       label = "Cancel"
                     />
                   }
                 />
                   </Tooltip>
           
           {inEditMode.status && inEditMode.rowKey === row.Id? (
              <Tooltip title="Save">
                        <FormControlLabel
                   control={
                      <SaveOutlinedIcon
                          onClick={() => onSave()}
                      >
                      </SaveOutlinedIcon>
                       }/>
                       </Tooltip>
              ) :  null
               }
                
                  <Tooltip title="Delete">
                        <FormControlLabel
                   control={
               <DeleteOutlineRoundedIcon onClick={() => deleteJob(row.Id)}>
               </DeleteOutlineRoundedIcon>
                       }/>
              </Tooltip>      
           </TableCell>
            <TableCell align="center">
              <Typography  >
              {
                inEditMode.status && inEditMode.rowKey === row.Id ? (
                    <TextField required id="standard-required" label="Required" value={rowData.name}
                          onChange={(event) => setRowData({...rowData, name : event.target.value})}
                    />
                ) : (
                  rowData.name
                )
                 }
                </Typography>
            </TableCell>

            <TableCell align="center">
              <Typography>
              {
                inEditMode.status && inEditMode.rowKey === row.Id ? (
                  <TextField required id="standard-required" label="Required" value={rowData.description}
                        onChange={(event) => setRowData({...rowData, description : event.target.value})}
                  />
              ) : (
                rowData.description
              )
                 }
                </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography >
              {
                inEditMode.status && inEditMode.rowKey === row.Id ? 
                (<TextField disabled id="standard-disabled" label="Disabled" defaultValue={row.createdOnDate} />):
                ( row.createdOnDate)
                 }
                </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography >
              {
                inEditMode.status && inEditMode.rowKey === row.Id ? 
                (<TextField disabled id="standard-disabled" label="Disabled" defaultValue={row.createdByUser} />):
                ( row.createdByUser)
                 }
                </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography >
              {
                inEditMode.status && inEditMode.rowKey === row.Id ? 
                (<TextField disabled id="standard-disabled" label="Disabled" defaultValue={row.updatedOnDate} />):
                ( row.updatedOnDate)
                 }
                </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography >
              {
                inEditMode.status && inEditMode.rowKey === row.Id ? 
                (<TextField disabled id="standard-disabled" label="Disabled" defaultValue={row.updatedByUser} />):
                ( row.updatedByUser)
                 }
                </Typography>
            </TableCell>
          </TableRow>

          <TableRow className={classes.row}>
            <TableCell
              style={{ paddingBottom: 0, paddingTop: 0 }}
              colSpan={6}
            >
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box margin={1}>
                  <Typography variant="h6" gutterBottom component="div">
                    Stages
                  </Typography>
                  <Table size="small" aria-label="purchases">
                    <TableBody>
                      {user
                        ? user.map((row) => (
                            <StageDetailList key={row.stageId} row={row} editStatus = {inEditMode.status} saveStatus = {saveStatus} cancelStatus = {cancelStatus}/>
                          ))
                        : null}
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
            </TableRow>
            </React.Fragment>
    ) : null}
  
  </React.Fragment>
);
};

export default Stages;
