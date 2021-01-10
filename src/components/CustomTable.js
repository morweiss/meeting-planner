import React , {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp  from '@material-ui/icons/ArrowDropUp';
import tableUtils from '../utils/tableUtils';

const {sortAscending, StyledTableCell, StyledTableRow} = tableUtils;

  class CustomTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            rows: this.props.rows,
            tableSort: {sortedBy:'from', sortType: 'ascending' }
        }
    }
    static getDerivedStateFromProps(props, state) {
        if (props.rows.length !== state.rows.length) {
          return {
            rows: props.rows,
            tableSort: {sortedBy:'from', sortType: 'ascending' }
          };
        }
        return null;
      }

      sortTableBySelected(headerCell){
        let newRows = [].concat(this.state.rows);
        if(headerCell.sortID && newRows.length > 1){
            let {sortedBy, sortType} = {...this.state.tableSort};
            let newSortType = sortType;
            if(sortedBy !== headerCell.sortID){
                newRows.sort((a, b) => { return sortAscending(a, b, headerCell.sortID)});
                newSortType = "ascending";
            }
            else {
                newRows.reverse();
                newSortType = sortType === 'ascending' ? 'descending' : 'ascending';
            }
            this.setState({
                rows:newRows,
                tableSort: {sortedBy: headerCell.sortID , sortType: newSortType}                
            })
        }
    }

    renderSortIcon(headerCell){
        if(headerCell.sortID){
            let {tableSort , rows} = this.state;
            let {sortedBy, sortType} = {...tableSort};
            if(rows.length < 2)
                return;
            else if(sortedBy === headerCell.sortID && sortType === "descending")
                return <ArrowDropDown />;
            else if (sortedBy === headerCell.sortID && sortType === "ascending")
                return <ArrowDropUp />
            else return;
        }
    }

    render(){
        const {rows} = this.state;
        const {header} = this.props;
        return (
        <Table  aria-label="customized table">
                {rows.length === 0 && <caption style={{textAlign: 'center'}} >No Meetings Available</caption>}
                <TableHead>
                    <TableRow>
                        {header.map((headerCell) => (
                            <tableUtils.StyledTableCell key={headerCell.text} align="left" style={{cursor: 'pointer'}} onClick={()=> this.sortTableBySelected(headerCell)}>
                                <span>{headerCell.text}</span>
                                {this.renderSortIcon(headerCell)}
                            </tableUtils.StyledTableCell>                           
                        ))}
                        </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.from}>
                        <StyledTableCell component="th" scope="row">
                            {row.meetingTitle}
                        </StyledTableCell>
                        <StyledTableCell align="left">{row.from}</StyledTableCell>
                        <StyledTableCell align="left">{row.to}</StyledTableCell>
                        <StyledTableCell align="left">{row.inviteeFirstName} {row.inviteeLastName}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
        </Table>  
    )
  }}
  
export default CustomTable;