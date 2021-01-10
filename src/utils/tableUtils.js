import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const tableFunctions = {
    
    StyledTableCell : withStyles((theme) => ({
        head: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        body: {
          fontSize: 14,
        },
      }))(TableCell),
      
     StyledTableRow : withStyles((theme) => ({
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      }))(TableRow),
    
    sortAscending: ( a, b, sortID)=>{
        if ( a[sortID] < b[sortID] ){
            return -1;
        }
        if ( a[sortID] > b[sortID] ){
            return 1;
        }
            return 0;
    }
}

export default tableFunctions;