import React , {useState, useEffect } from 'react';
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

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },

head:{backgroundColor:"#b0bec5"},
prop:{
  backgroundColor:"#eeeeee"
}


});


const Detail = (props) => {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
  console.log("**--**")
console.log(row)




const [ user, setUser ] = useState([]);
const [ fetchingUser, setFetchingUser ] = useState(true);
const [ noError, setNoError ] = useState(false);

useEffect(() => {
    const fetchUser = async () => {
        try {
            const response = await fetch(`http://localhost:3000/stageDetail/${row.Id}`, {
                
            });

            if (fetchingUser) {
                const data = await response.json();
                setUser(data);
            }

            setFetchingUser(false);

        } catch {
            setNoError(false);
        }
    }

    fetchUser();
}, [])








console.log(user)









    
    return (




      <React.Fragment>
        <TableRow className={classes.head}>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.stageName}
          </TableCell>
        
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                {/* <Typography variant="h6" gutterBottom component="div">
                  Stage-Detail
                </Typography> */}
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Property</TableCell>
                      <TableCell align='center'>Property Value</TableCell>
                      
                    </TableRow>
                  </TableHead> 
                  <TableBody>
                    {user.map((historyRow) => (
                      <TableRow key={historyRow.Id} className={classes.prop}>
                        <TableCell component="th" scope="row">
                          {historyRow.property}
                        </TableCell>
                        <TableCell align='center'>{historyRow.property_value}</TableCell>
                        
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
}

export default Detail
