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
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  console.log("Checking props");
  console.log(row);

  const [user, setUser] = useState([]);
  const [fetchingUser, setFetchingUser] = useState(true);
  const [noError, setNoError] = useState(false);
  const [jobs, setJobs] = useState(row);
  const [nameDisplay, setNameDisplay] = useState({
    name: row.name,
    description: row.description,
  });

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

  const updateJob = (row) => {
    axios.put(`http://localhost:3000/jobs/${row.Id}`, {
      name: jobs.name,
      description: jobs.description,
    });
    row.name = jobs.name;
    row.description = jobs.description;
    // console.log(row)
    setNameDisplay({ name: jobs.name, description: jobs.description });
  };

  const deleteJob = (id) => {
    console.log("del");
    console.log(id);

    // fetch(`http://localhost:3000/jobs/${id}`, { method: 'DELETE' }).then(()=>{setJobs(null)})
    axios.delete(`http://localhost:3000/jobs/${id}`).then(() => {
      setJobs(null);
    });
  };

  const handleJobNameChange = (event) => {
    console.log(event.target.value);
    const value_name = event.target.value;
    const name = event.target.name;
    console.log(value_name, name);
    setJobs((prevValue) => {
      if (name === "jobName") {
        return { name: value_name, description: prevValue.description };
      } else {
        return { name: prevValue.name, description: value_name };
      }
    });
  };

  return (
    <div>
      {" "}
      {jobs ? (
        <React.Fragment>
          <Table>
            <TableRow className={classes.head}>
              <TableCell>
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setOpen(!open)}
                >
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">{nameDisplay.name}</Typography>
              </TableCell>

              <TableCell>
                <div>
                  <input
                    type="text"
                    placeholder="Edit Job Name"
                    name="jobName"
                    onChange={handleJobNameChange}
                  ></input>
                  <button onClick={() => updateJob(row)}>Update</button>
                </div>
              </TableCell>

              <TableCell align="right">
                <Typography variant="h6">{nameDisplay.description}</Typography>
              </TableCell>

              <TableCell>
                <div>
                  <input
                    type="text"
                    placeholder="Edit Job Description"
                    name="jobDescription"
                    onChange={handleJobNameChange}
                  ></input>
                  <button onClick={() => updateJob(row)}>Update</button>
                </div>
              </TableCell>

              <TableCell>
                <button onClick={() => deleteJob(row.Id)}>
                  {" "}
                  <DeleteOutlineRoundedIcon />
                </button>
              </TableCell>
              <TableCell />
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
                              <StageDetailList key={row.Id} row={row} />
                            ))
                          : null}
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

export default Stages;
