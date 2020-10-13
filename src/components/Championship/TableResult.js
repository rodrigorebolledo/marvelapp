import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);



const PrintResults = (props) => {
    return props.result.map((element, idx) => (
        <StyledTableRow key={idx}>
        <StyledTableCell component="th"  scope="row">
        {element.name}
        </StyledTableCell>
        <StyledTableCell scope="row">
        {element.wins}
        </StyledTableCell>
      </StyledTableRow>
      )
    );
  }
  

  const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 575,
    },
  });

export default function TableResult(props) {
  const classes = useStyles();

  return (
    <Grid
        item item xs={12} md={3}  xl={3} 
    >   <Paper className={classes.root}>
            <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                <TableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>Wins</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    <PrintResults result={props.result}/>
                </TableBody>
            </Table>
            </TableContainer>
        </Paper>
    </Grid>
  );
}
