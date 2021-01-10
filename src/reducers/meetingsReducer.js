import { ADD_MEETING } from '../actions/types';
import moment from 'moment';

const initialState = {
    meetings: [],
    organizer : {firstName: "John" , lastName: "Doe"}
  }

function insertMeetingWithOrder(meetingsArr, meeting){
    let newMeetingStartingTime = meeting.from;
    if(meetingsArr.length === 0 ){
            return meetingsArr.concat({...meeting});
    }
    for (let i=0; i<meetingsArr.length; i++){
        let tempMeetingStartingTime = meetingsArr[i].from;
        if (moment(newMeetingStartingTime).isBefore(tempMeetingStartingTime)){ //the new meeting should be in the first place
            return meetingsArr.slice(0,i).concat({...meeting}).concat(meetingsArr.slice(i));
        }
    }
    return meetingsArr.slice(0,meetingsArr.length).concat({...meeting}); 
}

const meetingsReducer = (state=initialState, {type, payload}) => {
    switch(type) {
        case ADD_MEETING: {
            let sortedMeetings = insertMeetingWithOrder(state.meetings, {...payload});
            return {
                ...state,
                meetings: sortedMeetings
            }
        }
        default:
            return state;
    }
}

export default meetingsReducer;