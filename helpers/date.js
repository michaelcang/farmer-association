let getDate = function(dateString) {
  let day =  `${dateString.getDate()}/${dateString.getMonth() + 1}/${dateString.getFullYear()}`;
  let time = `${dateString.getHours()}:${dateString.getMinutes()}`;
  return day + ' ' + time;
};

module.exports = getDate;
