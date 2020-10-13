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

const useStyles = makeStyles({
  tableContainer: {
    width: '100%'
  },
});

export default function TableFight(props) {
  const classes = useStyles();
  const {nameFirstCharacter, nameSecondCharacter, powerFirstCharacter, powerSecondCharacter, 
    lifeFirstCharacter, lifeSecondCharacter, defenseFirstCharacter, defenseSecondCharacter} = props
  return (
    <Grid
        item xs={12} md={12}  xl={12} 
    >
        <TableContainer className={classes.tableContainer} component={Paper}>
        <Table>
            <TableHead>
            <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Power</StyledTableCell>
                <StyledTableCell>Life</StyledTableCell>
                <StyledTableCell>Defense</StyledTableCell>
                <StyledTableCell>Vs</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Power</StyledTableCell>
                <StyledTableCell>Life</StyledTableCell>
                <StyledTableCell>Defense</StyledTableCell>        
            </TableRow>
            </TableHead>
            <TableBody>
                <StyledTableRow>
                    <StyledTableCell>{nameFirstCharacter}</StyledTableCell>
                    <StyledTableCell>{powerFirstCharacter}</StyledTableCell>
                    <StyledTableCell>{Math.round(lifeFirstCharacter)}</StyledTableCell>
                    <StyledTableCell>{defenseFirstCharacter}</StyledTableCell>
                    <StyledTableCell>Vs</StyledTableCell>
                    <StyledTableCell>{nameSecondCharacter}</StyledTableCell>
                    <StyledTableCell>{powerSecondCharacter}</StyledTableCell>
                    <StyledTableCell>{Math.round(lifeSecondCharacter)}</StyledTableCell>
                    <StyledTableCell>{defenseSecondCharacter}</StyledTableCell>
                </StyledTableRow>
            </TableBody>
        </Table>
        </TableContainer>
    </Grid>
  );
}
