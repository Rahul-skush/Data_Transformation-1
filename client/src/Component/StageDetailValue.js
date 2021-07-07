import React, { useState, useEffect } from "react";
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
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Tooltip from "@material-ui/core/Tooltip";
import Checkbox from "@material-ui/core/Checkbox";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { ShowStageDetailValue } from "./FakeServer";

import axios from "axios";
import './Table.css'

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },

  head: { backgroundColor: "#b0bec5" },
  prop: {
    backgroundColor: "#eeeeee",
  },
});

const StageDetailValue = (props) => {
  console.log("\n\n\n\n");
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  console.log("**--**");
  console.log(props);

  const [inEditMode, setInEditMode] = useState({
    status: false
  });
  
  // const [user, setUser] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [originalData, setOriginalData] = useState();
  const [fetchingUser, setFetchingUser] = useState(true);
  const [noError, setNoError] = useState(false);
  const [load, setLoad] = useState(true);

  const updateData = (data) => {
    var fakeServer = new ShowStageDetailValue(data, row);
    var fakeServer1 = fakeServer;
    setRowData(fakeServer);
    setOriginalData(fakeServer1);
    // console.log("stageDetailID's", fakeServer);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const resp = await fetch("http://localhost:3000/stageDetail")
          .then((resp) => resp.json())
          .then((data) => updateData(data));
      } catch {
        setNoError(false);
      }
      setFetchingUser(false);
    };
    if (fetchingUser) fetchUser();
  },[inEditMode]);

  const updateInventory = async (data) => {
    await axios
      .put(
        `http://localhost:3000/stageDetail/${data[0].jobId}/${data[0].stageId}/${data[0].stageDetailId}`,
        data
      )
      .then((response) => console.log("stagedetail -- ", response))
      .then((json) => {
        // reset inEditMode and unit price state values
         onCancel(1);
        // fetch the updated data
      });
  };

  const updateItem = (index, whichValue, newvalue) => {
    if (index !== -1) {
      let temporaryarray = rowData.slice();
      temporaryarray[index][whichValue] = newvalue;
      setRowData(temporaryarray);
    } else {
      console.log("no match");
    }
  };

  const findIndexOf = (id, whichValue, width) => {
    let index = rowData.findIndex((x) => x.id === id);
    return inEditMode.status ? (
      <TextareaAutosize
        rowsMax={4}
        aria-label="maximum height"
        placeholder="Empty"
        style={{ width: width }}
        value={rowData[index][whichValue]}
        onChange={(event) => {
          updateItem(index, whichValue, event.target.value);
        }}
      />
    ) : (
      rowData[index][whichValue]
    );
  };

  const deleteStageDetail = async (data) => {
    const deleteData = {
      jobId: data[0].jobId,
      stageId: data[0].stageId,
      stageDetailId: data[0].stageDetailId,
    };
    await axios
      .delete(`http://localhost:3000/stageDetail/${deleteData.jobId}/${deleteData.stageId}/${deleteData.stageDetailId}`, deleteData)
      .then((response) => console.log("stagedetail -- ", response))
      .then((json) => {
        // reset inEditMode and unit price state values
        setLoad(false);
        // fetch the updated data
      });
  };

  const onEdit = (Id) => {
    setInEditMode({
      status: true
    });
  };

  const onSave = () => {
    updateInventory(rowData)
  };

  const onCancel = (check) => {
    //reset the inEditMode state value
    setInEditMode({
      status: false
    });
    if (check === 0) {
      console.log(originalData);
      setRowData(originalData);
    }
  };

  return (
    <div>
   
      {load?
        (
          <React.Fragment>
          <TableRow>
        <TableRow className={classes.head}>
           <TableCell component="th" scope="row" align="left">
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
              <Tooltip
                title={
                  inEditMode.status
                    ? "Cancel"
                    : "Edit"
                }
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={inEditMode.status}
                      style={{ marginLeft: 8 }}
                      onChange={() => {
                        inEditMode.status
                          ? onCancel(0)
                          : onEdit(row.stageDetailId);
                      }}
                      name="checkedA"
                      color="primary"
                      label="Cancel"
                    />
                  }
                />
              </Tooltip>

              {inEditMode.status ? (
                <>
                  <Tooltip title="Save">
                    <FormControlLabel
                      control={
                        <SaveOutlinedIcon
                          onClick={() => onSave()}
                        ></SaveOutlinedIcon>
                      }
                    />
                  </Tooltip>
                  <Tooltip title="Delete">
                    <FormControlLabel
                      control={
                        <DeleteOutlineRoundedIcon
                          onClick={() => deleteStageDetail(rowData)}
                        ></DeleteOutlineRoundedIcon>
                      }
                    />
                  </Tooltip>
                </>
              ) : null}
            </TableCell>
          <TableCell component="th" scope="row">
            <Typography variant="h6" gutterBottom component="div">
              stage Detail no. ---&gt; {row.stageDetailId}
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  Stage-Detail data
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Property</TableCell>
                      <TableCell align="center">Property Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rowData.map((item) => (
                      <TableRow key={item.id} className={classes.prop}>
                        <TableCell align="right" component="th" scope="row">
                          {findIndexOf(item.id, "property", "200px")}
                        </TableCell>
                        <TableCell align="center" component="th" scope="row">
                          {findIndexOf(item.id, "property_value", "500px")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </TableRow>
       </React.Fragment>
        )
      :null}
   
    </div>
  );
};

export default React.memo(StageDetailValue);
