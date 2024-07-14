import moment from 'moment';
import 'moment-timezone';

console.log(moment.tz.names());

export const getDateTime = (date) => {
    if (!date) return;

    return moment(date).tz('US/Aleutian').format('DD/MM/YYYY HH:mm:ss');
};


export const getDateTimeLL = (date) => {
    if (!date) return;
  
    return moment(date).tz('America/Guayaquil').locale('es').format('LL, HH:mm:ss');
};