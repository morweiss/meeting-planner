import moment from 'moment';
const rangePickerFunctions = {
    disableTimeRanges(timeToCheck, disabledTimeRanges) {
    let shouldDisable = false;
    let timeToCheckFormatted =timeToCheck.format("MM-DD-YYYY");
    if( timeToCheck && timeToCheck < moment().startOf('day')){
        shouldDisable=true;
    }
    disabledTimeRanges.forEach(element => {
        let start = moment(element.start).format("MM-DD-YYYY");
        let end = moment(element.end).format("MM-DD-YYYY");
            if(moment(timeToCheckFormatted).isAfter(start) && (moment(timeToCheckFormatted).isBefore(end))){
                shouldDisable= true;
                return;
            }
    });
        return shouldDisable && timeToCheck;
    },

   disableHours(date, disabledTimeRanges) {
        const array = [];
        if(date){
            let formatDate = date.format("MM-DD-YYYY HH:mm");
            if ( formatDate) {
                if(moment(formatDate).isSame(moment(), "day")) //disable past hours
                    for(let i =0; i < moment().hour(); i++){
                        array.push(i);
                }
                disabledTimeRanges.forEach((values) => {
                if (moment(formatDate).isSame(values.start, "day") && moment(formatDate).isSame(values.end, "day")){ //disable hours that already taken
                    for (let i = moment(values.start).hour(); i < moment(values.end).hour(); i += 1) 
                        array.push(i);
                    }
                else if (moment(formatDate).isSame(values.start, "day")) {
                    for (let i = moment(values.start).hour(); i < 24 ; i += 1) 
                        array.push(i);
                    }      
                else if (moment(formatDate).isSame(values.end, "day")) {
                    for (let i = 0; i < moment(values.end).hour() ;  i += 1) {
                        array.push(i);
                    }
                }
                });
            
            }
    }   
        return array;
    },
    disableMinutes(date, disabledTimeRanges){
        const array = [];
        if(date){
            let formatDate = date.format("MM-DD-YYYY HH:mm");
            if ( formatDate) {
                if(moment(formatDate).isSame(moment(), "hour")) //disable past hours
                    for(let i =0; i < moment().minute(); i++){
                        array.push(i);
                }
            }
        }
        return array;
    },
    getConflictedTimeRange(dateString, disabledTimeRanges){
        let conflictedTimeRange = {}
        disabledTimeRanges.forEach(element => {
            if(moment(dateString[0]).isSameOrBefore(element.start) && (moment(dateString[1]).isSameOrAfter(element.start))){
                conflictedTimeRange= element;
                return;
            }
        });
        return conflictedTimeRange;
    }
    
}
export default rangePickerFunctions;