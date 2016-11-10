
var secondToTime = function( second ) {

    var sec = second%60;
    var min = Math.round(second/60);
    var hour = Math.round(min/60);
    min = min%60;
    var day = Math.round(hour/24);
    hour = hour%24;
    var time = {"day":day,"hour":hour, "minute":min, "second": sec};


    var timeText ='';
    if(time.day!=0){
      timeText = timeText+time.day+" day(s) ";
    }
    if(time.hour!=0){
      timeText =timeText+time.hour+" hour(s) ";
    }
    if(time.minute!=0){
      timeText =timeText+time.minute+" minute(s) ";
    }
    if(time.second!=0){
      console.log(time);
      timeText =timeText+time.second+" second(s) ";
    }
    console.log(timeText);
    return timeText;

};


// Make QueryString into object
var getQuerystringAsObject = function() {
  console.log("ajax.js | getQuerystringAsObject called");
    var keyNvalueArray = window.location.search.slice(1).split('&');

    var queryObject = {};

    // set default start and size
    queryObject['start'] = 1;
    queryObject['size'] = 5;

    for (index in keyNvalueArray) {
        var keyNvalue = keyNvalueArray[index].split('=');
        var key = keyNvalue[0];
        var value = keyNvalue[1];
        queryObject[key] = parseInt(value);
    }

    return queryObject;
};

// Get AJAX request URI for live report
var getXHRRequestUriForLive = function() {
  console.log("ajax.js | getXHRRequestUriForLive called");
  var queryObject = getQuerystringAsObject();
  var uri ='http://10.70.0.203:3300/altiface/reports/ranking/live' + '?start=' + queryObject['start'] + '&size=' +queryObject['size'];
  return uri;
}

// Make AJAX instance for live report
var xhrLive = new XMLHttpRequest();

var sendXHRRequest = function() {
  console.log("ajax.js | sendXHRRequest called");
  // Set AJAX request for live report
  xhrLive.open('GET', getXHRRequestUriForLive(), true);
  xhrLive.setRequestHeader('Content-Type', 'application/json');
  xhrLive.setRequestHeader("X-Requested-With", "XMLHttpRequest");


  // Send AJAX request
  xhrLive.send();
}


xhrLive.onload = function() {
  if(xhrLive.status ===200){
    var responseJson = JSON.parse(xhrLive.responseText);
    console.log(responseJson);

    // Make template with responsed data

    for (var i = 0; i < 3; i++) {
        var name = (responseJson.data[i].person_id).split('_')[2];
        var total_time = secondToTime(responseJson.data[i].total_time);
        console.log(typeof  responseJson.data[i].total_time);
        var imgUri = responseJson.data[i].channels[0].image_url;
        console.log( name , total_time , imgUri);
        var className = "rank-" + (i + 1);
        $("." + className).children("img").attr("src", imgUri);
        $("." + className).children("div").children("h3").html(name);
        $("." + className).children("div").children(".contents").html(total_time);

    }

  }
};
