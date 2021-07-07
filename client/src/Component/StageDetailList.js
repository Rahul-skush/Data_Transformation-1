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
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import axios from "axios";
import StageDetailValue from "./StageDetailValue";
import ShowStageDetailList from "./FakeServer";
import './Table.css'

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

  const [inEditMode, setInEditMode] = useState({
    status: false
  });


  console.log("**Checkin if it's reaching ", Date.now());

  //console.log(props.row);
  const [row, setRow] = useState(rows.row);
  const [user, setUser] = useState([]);
  const [fetchingUser, setFetchingUser] = useState(true);
  const [load, setLoad] = useState(true);
 
 
  const [rowData, setRowData] = useState({
    id: row.id,
    name: row.name,
    jobId: row.jobId,
  });

  const updateData = (data) => {
    var fakeServer = new ShowStageDetailList(data, row.id, row.jobId);
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
 

  const updateInventory = async () => {
    const data = rowData;
    await axios
      .put(`http://localhost:3000/stages/${data.jobId}`, data)
      .then((response) => console.log("stages -- ", response))
      .then((json) => {
        // reset inEditMode and unit price state values
        row.name = rowData.name;
        onCancel(1);
        // fetch the updated data
      });
  };
 
  const onEdit = (Id) => {
    setInEditMode({
      status: true
    });
  };
  const deleteStage = (id) => {
    console.log("del");
    console.log(id);
    axios.delete(`http://localhost:3000/stages/${id}`).then(() => {
      setLoad(false)
    });
  };

  const onSave = () => {
    if (rowData.name !== row.name) updateInventory();
  };

  const onCancel = (check) => {
    //reset the inEditMode state value
    setInEditMode({
      status: false
    });
    if (check === 0) {
      setRowData(row);
    }
  };

  return (
    <div>
      {load ? (
        <React.Fragment>
          <Table>
            <TableRow className={classes.rowcolor}>
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
                        inEditMode.status && inEditMode.rowKey === row.Id
                          ? onCancel(0)
                          : onEdit(row.Id);
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
                          onClick={() => deleteStage(row.id)}
                        ></DeleteOutlineRoundedIcon>
                      }
                    />
                  </Tooltip>
                </>
              ) : null}
            </TableCell>
              <TableCell align="left">
                <Typography>
                  {inEditMode.status ? (
                    <TextField
                      required
                      id="standard-required"
                      label="Required"
                      value={rowData.name}
                      defaultValue=""
                      onChange={(event) => {
                        event.preventDefault();
                        setRowData({
                          ...rowData,
                          name: event.target.value,
                        });
                      }}
                    />
                  ) : (
                    row.name
                  )}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                style={{ paddingBottom: 0, paddingTop: 0 }}
                colSpan={6}
              >
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box margin={1}>
                    <Typography gutterBottom component="div">
                      Stage Detail Id
                    </Typography>
                    <Table size="small" aria-label="purchases">
                      <TableBody>
                        {user.map((item) => (
                          <StageDetailValue
                            key={item.ID}
                            row={item}
                          />
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
