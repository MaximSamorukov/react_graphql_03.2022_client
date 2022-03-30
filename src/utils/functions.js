import moment from "moment";

function dateFormat(date, format = 'MMMM Do YYYY, h:mm:ss a') {
  return moment(date).format(format);
}

export {
  dateFormat
}