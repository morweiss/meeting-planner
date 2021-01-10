import React , {Component} from 'react';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { DatePicker} from 'antd';
import "antd/dist/antd.css";
import Button from '@material-ui/core/Button';
import moment from 'moment';
import addMeeting from '../actions/index';
import {getDisabledTimeRanges} from '../selectors/index';
import rangePickerUtils from '../utils/rangePickerUtils';

const { RangePicker } = DatePicker;
const {getConflictedTimeRange, disableTimeRanges, disableHours, disableMinutes } = rangePickerUtils;

class NewMeetingForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            meetingTitle: "",
            from: '',
            to: '',
            inviteeFirstName: "" ,
            inviteeLastName: ""
        }
    }

    addMeetingButtonClicked(){
        this.props.addMeeting(this.state);
        this.setState({
            meetingTitle: "",
            from: '',
            to: '',
            inviteeFirstName: "" ,
            inviteeLastName: ""
        });
    }

    checkIfButtonDisabled = () =>{
        let {meetingTitle, inviteeFirstName, inviteeLastName, from, to} = this.state;
        if (meetingTitle && inviteeFirstName && inviteeLastName && from && to){
            return false;
        }
        return true;
    }

    setTimeRangeToState = (dateString) => {
        let {disabledTimeRanges} =this.props;
        let confilctedTimeRange = getConflictedTimeRange(dateString, disabledTimeRanges); //if conflictwith another meeting return the starting and ending, aotherwise return {}}
        if(dateString[0] !== dateString[1]){
            if (Object.entries(confilctedTimeRange).length === 0){
                this.setState({from: dateString[0], to: dateString[1]});
            }
            else {
                window.alert("There is another meeting that starts at: " + confilctedTimeRange.start + " and ends at: " + confilctedTimeRange.end + ". Please select another time range");
            }
        }
        else {
            window.alert("Meeting can't start and end at the same time");
        }
    }

    getDisableRange=(date)=>{
        let {disabledTimeRanges} =this.props;
        return disableTimeRanges(date, disabledTimeRanges);
    }
    getDisabledHours = (date, type) => {
        let {disabledTimeRanges} =this.props;
        return  disableHours(date, disabledTimeRanges);

    };
    getDisabledMinutes = (date, type) => {
        let {disabledTimeRanges} =this.props;
        return disableMinutes(date, disabledTimeRanges);
    };

    render (){
        const rangePickerDefaultValue = {
            start: moment().minutes(0),
            end: moment().hours(moment().hour()+1).minutes(0)
        };
        return (
            <Box my={2}>
                <form>
                    <Box my={3}>    
                        <TextField id="standard-basic" label="Meeting Title" fullWidth 
                                value={this.state.meetingTitle}  required 
                                onChange= {(event) => {this.setState({ meetingTitle: event.target.value }); }}/>
                    </Box>
                    <Box my={3}>
                        <div style={{display: 'flex', justifyContent:'space-between'}}>
                            <TextField id="standard-basic" label="Invitee First Name" style={{ width: '48%' }}
                                value={this.state.inviteeFirstName} required
                                onChange={(event) => {this.setState({ inviteeFirstName: event.target.value }); }}
                            />
                            <TextField id="standard-basic" label="Invitee Last Name" style={{ width: '48%' }}
                                value={this.state.inviteeLastName} required
                                onChange= {(event) => {this.setState({ inviteeLastName: event.target.value }); }}
                            />
                        </div>
                    </Box>
                    <Box my={3}>    
                        <div style={{display: 'flex', justifyContent:'space-between'}}>
                            <RangePicker
                                onCalendarChange={(date,dateString) => this.setTimeRangeToState(dateString)}
                                showTime={{ format: 'HH:mm' , 
                                            defaultValue: [rangePickerDefaultValue.start, rangePickerDefaultValue.end]}}
                                format={"MM-DD-YYYY HH:mm"}
                                disabledTime={(date, type) => ({
                                    disabledHours: () => this.getDisabledHours(date, type),
                                    disabledMinutes: () => this.getDisabledMinutes(date)
                                  })}
                                disabledDate={(current)=>this.getDisableRange(current)}
                                minuteStep={10}
                                style={{width:'70%'}}
                                inputReadOnly ={true}
                            />
                            <Button variant="contained" color="primary" disabled={this.checkIfButtonDisabled()} onClick={()=> this.addMeetingButtonClicked()}>
                                Add Meeting
                            </Button>
                        </div>
                    </Box>
                </form>
            </Box>
        )
    }
}

const mapStateToProps = state => {
    return {
        organizer: state.meetings.organizer,
        disabledTimeRanges: getDisabledTimeRanges(state)
        }
    };
  
const mapDispatchToProps = dispatch => {
    return {
          addMeeting: (newMeeting) => addMeeting(dispatch, newMeeting)
        }
    };
  
export default connect(mapStateToProps, mapDispatchToProps)(NewMeetingForm)