
var secondToTIme = function( second ) {
  if (!second) {
    var sec = second%60;
    var min = Math.round(second/60);
    var hour = Math.round(min/60);
    min = min%60;
    var day = Math.round(hour/24);
    hour = hour%24;
    var time = {"day":day,"hour":hour, "minute":min, "second": sec};
    return time;
  } else {
    console.log(" secondToTime | Input with undefined")
  }
};
