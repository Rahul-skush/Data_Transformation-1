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
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { ShowStageDetailValue } from "./FakeServer";

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
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  console.log("**--**");
  console.log(row);

  const [user, setUser] = useState([]);
  const [fetchingUser, setFetchingUser] = useState(true);
  const [noError, setNoError] = useState(false);

  const updateData = (data) => {
    var fakeServer = new ShowStageDetailValue(data, row);
    setUser(fakeServer);
    console.log("stageDetailID's", fakeServer);
    return () => {
      "rrgr";
    };
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
  });

  console.log(user);

  return (
    <React.Fragment>
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
        <TableCell component="th" scope="row">
          {row.stageDetailId}
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
                  {user.map((item) => (
                    <TableRow key={item.Id} className={classes.prop}>
                      <TableCell component="th" scope="row">
                        {item.property}
                      </TableCell>
                      <TableCell align="center">
                        {item.property_value}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default StageDetailValue;
