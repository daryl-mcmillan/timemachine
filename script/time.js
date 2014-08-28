function render_list(containerId,dates) {
  var dateList = dates.map(function(d){return d.toISOString();}).join("\n");
  var parent = document.getElementById(containerId);
  parent.innerHTML = "<pre></pre>"
  parent.firstChild.innerText = dateList;
}

function render_heatbar(containerId,dates) {
  var parent = document.getElementById(containerId);
  parent.innerHTML = "<canvas width='1000' height='1'></canvas>"
  var canvas = parent.firstChild;
  canvas.style.width="100%";
  canvas.style.height="20px";
  var sortedTicks = dates.map(function(d){return d.getTime();}).sort();
  var relativeTicks = sortedTicks.map(function(t){return t-sortedTicks[0];});
  var max = relativeTicks[relativeTicks.length-1];
  if( max == 0 ) {
    return;
  }
  var context = canvas.getContext("2d");
  context.strokeStyle="#ff0000";
  context.globalAlpha = 0.5
  for( var i=0; i<relativeTicks.length; i++ ) {
    var x=relativeTicks[i] * 1000 / max;
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, 1);
    context.stroke();
  }
}

function render_data() {
  var raw = document.getElementById("rawdata").value;
  var pattern = document.getElementById("pattern").value;
  
  var matcher = new RegExp(pattern,"gim");
  var matches = raw.match(matcher);
  if( !matches ) {
    return;
  }
  var matchList = ""
  var dates = [];
  for( var i=0; i<matches.length; i++ ) {
    var m = matches[i];
    var d = Date.parse(m);
    if(d) {
      dates.push(new Date(d));
    } else {
      console.log( {bad:m} );
    }
  }

  if( dates.length == 0 ) {
    return;
  }

  render_list("list",dates);
  render_heatbar("heatbar",dates);
}