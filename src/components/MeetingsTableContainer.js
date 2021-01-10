import React , {Component} from 'react';
import {connect} from 'react-redux';
import CustomTable from './CustomTable';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const tableHeader = [{text: 'Meeting Title', sortID: 'meetingTitle'},
                {text: 'Meeting Starting Time', sortID: 'from'},
                {text: 'Meeting Ending Time'},
                {text: 'Meeting Invitee'}
    ];

class MeetingsTableContainer extends Component {
    render(){
        const {meetings, organizer} = this.props.meetings;
        return (
            <Box>
                <Box my={1}>
                    <Typography variant="h6"> Upcoming meetings for {organizer.firstName} {organizer.lastName}: </Typography>
                </Box>
                <TableContainer component={Paper}>
                    <CustomTable  rows={meetings} header={tableHeader}/>
                </TableContainer>
                {meetings.length > 1 && <Typography variant="caption"> *Click on "Meeting title" or "Meeting starting date" to sort.</Typography> }
            </Box>
        );
    }
}

const mapStateToProps = state => {
    return {
        meetings: state.meetings,
        organizer: state.organizer
        }
    };
  
export default connect(mapStateToProps)(MeetingsTableContainer);