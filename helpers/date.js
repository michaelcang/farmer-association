let getDate = function(dateString) {
  let day =  `${dateString.getDate()}/${dateString.getMonth() + 1}/${dateString.getFullYear()}`;
  if (dateString.getMinutes() < 10) {
    let time = `${dateString.getHours()}:0${dateString.getMinutes()}`;
  } else {
    let time = `${dateString.getHours()}:${dateString.getMinutes()}`;
  }
  return day + ' ' + time;
};

module.exports = getDate;
