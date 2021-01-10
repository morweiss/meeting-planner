import { createSelector } from 'reselect';

const getMeetings = state => state.meetings

export const getDisabledTimeRanges = createSelector ([getMeetings], ({meetings}) => {
    let disabledRanges = [];
    meetings.forEach(element => {
        disabledRanges.push({start: element.from, end: element.to});
    });
    return disabledRanges;
})


