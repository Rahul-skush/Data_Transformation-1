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

import Stages from "./Stages";
import axios from "axios";

const useRowStyles = makeStyles({
  head: {
    // backgroundColor:"#555555"
    backgroundColor: "#607d8b",
  },
});

export default function CollapsibleTable() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/jobs")
      .then((res) => {
        setJobs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const classes = useRowStyles();

  return (
    <TableContainer component={Paper}>
     
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow className={classes.head}>
            <TableCell align="center">
              <Typography variant="h5">Data Transformation</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs.map((row) => (
            <Stages key={row.Id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
