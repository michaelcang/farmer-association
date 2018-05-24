let getDate = function(dateString) {
  let day =  `${dateString.getDate()}/${dateString.getMonth() + 1}/${dateString.getFullYear()}`;
  let time;
  if (dateString.getMinutes() < 10) {
    time = `${dateString.getHours()}:0${dateString.getMinutes()}`;
  } else {
    time = `${dateString.getHours()}:${dateString.getMinutes()}`;
  }
  return day + ' ' + time;
};

module.exports = getDate;
