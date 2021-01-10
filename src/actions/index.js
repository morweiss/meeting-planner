import { ADD_MEETING } from './types';

export default function addMeeting(dispatch, newMeeting){
 dispatch({ type: ADD_MEETING, payload: newMeeting});
};

