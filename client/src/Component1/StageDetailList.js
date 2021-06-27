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
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import StageDetailValue from "./StageDetailValue";
import ShowStageDetailList from "./FakeServer";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

const StageDetailList = (props) => {
  console.log("\n\n\n\n");
  console.log("propopps", props);
  const rows = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  console.log("**Checkin if it's reaching " , Date.now() );
  
  //console.log(props.row);
  const [row, setRow] = useState(rows.row);
  const [user, setUser] = useState([]);
  const [fetchingUser, setFetchingUser] = useState(true);
  const [rowData, setRowData] = useState({
    stageId : row.stageId,
    stageName : row.stageName, 
    jobId : row.jobId
  });
  
  const updateData = (data) => {
    var fakeServer = new ShowStageDetailList(data, row.stageId, row.jobId);
    setUser(fakeServer);
   // console.log("stageDetailID's", fakeServer);
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const resp = await fetch("http://localhost:3000/stageDetail")
          .then((resp) => resp.json())
          .then((data) => updateData(data));
      } catch {}
      setFetchingUser(false);
    };
    if (fetchingUser) fetchUser();
  });
  useEffect(() => {
    if(props.saveStatus){
      if(rowData.stageName!==row.stageName)
       updateInventory();
    }
  }, [props.editStatus, props.saveStatus, props.cancelStatus,props.row])

  

if(props.cancelStatus===0){
  
}




const updateInventory = async () => {
  const data = rowData
   await axios.put(`http://localhost:3000/stages/`, data)
        .then(response => console.log("stages -- ", response))
        .then(json => {
            // reset inEditMode and unit price state values
        row.stageName = rowData.stageName;
            // fetch the updated data
            
        })
}
const deleteStage = (id) => {
  console.log("del");
  console.log(id);
  axios.delete(`http://localhost:3000/stages/${id}`).then(() => {
    setRow(null);
  });
};

useEffect(() => {
  
},[props.saveStatus, row.stageName, rowData.stageName])


  return (
    <div>
      {row ? (
        <React.Fragment>
          <Table>
          <TableRow className={classes.rowcolor} >
            <TableCell>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
              <> &nbsp;</>
              <Tooltip title="Delete">
                        <FormControlLabel
                   control={
               <DeleteOutlineRoundedIcon onClick={() => deleteStage(row.stageId)}>
               </DeleteOutlineRoundedIcon>
                       }/>
              </Tooltip>
            </TableCell>
            <TableCell align="left">
                <Typography 
                >
                {
                  props.editStatus ? (
                      <TextField required id="standard-required" label="Required" value={rowData.stageName} defaultValue=""
                            onChange={(event) =>{event.preventDefault(); setRowData({...rowData, stageName : event.target.value})}}
                      />
                  ) : (
                    row.stageName
                  )
                   }
                  </Typography>
              </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box margin={1}>
                  <Typography 
                   gutterBottom component="div">
                    Stage Detail Id
                  </Typography>
                  <Table size="small" aria-label="purchases">
                    <TableBody>
                      {user.map((item) => (
                        <StageDetailValue key={item.ID} row={item} editStatus = {props.editStatus} saveStatus = {props.saveStatus} cancelStatus = {props.cancelStatus}/>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
          </Table>
        </React.Fragment>
      ) : null}
    </div>
  );
};

export default React.memo(StageDetailList);
