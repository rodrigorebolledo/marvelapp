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
import { Typography } from '@material-ui/core';
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


const useStyles = makeStyles({
  paper: {
    width: '100%'
  }
});


const PrintFighters = (props) => {
  if(props.orderedCharacterClassified.length > 0){
      return props.orderedCharacterClassified.map((elementParent, idx) => (
        <StyledTableRow key={idx}>
        <StyledTableCell component="th" scope="row">
        {idx+1}
        </StyledTableCell>
        <StyledTableCell scope="row">
        {elementParent[0].name}
        </StyledTableCell>
        <StyledTableCell scope="row">
        VS
        </StyledTableCell>
        <StyledTableCell scope="row">
        {elementParent[1].name}
        </StyledTableCell>
      </StyledTableRow>
      )
    );
  } else {
      return props.orderedCharacter.map((elementParent, idx) => (
        <StyledTableRow key={idx}>
        <StyledTableCell component="th" scope="row">
        {idx+1}
        </StyledTableCell>
        <StyledTableCell scope="row">
        {elementParent[0].name}
        </StyledTableCell>
        <StyledTableCell scope="row">
        VS
        </StyledTableCell>
        <StyledTableCell scope="row">
        {elementParent[1].name}
        </StyledTableCell>
      </StyledTableRow>
      )
    );    
  }

}

export default function TableOrderedCharacter(props) {
  const classes = useStyles();

  return (
    <Grid
      item xs={12} md={5}  xl={5} 
    >
      <Typography>Order Fighters</Typography>
      <TableContainer className={classes.paper}  component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Turn</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Vs</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <PrintFighters orderedCharacter={props.orderedCharacter} orderedCharacterClassified={props.orderedCharacterClassified}/>
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
