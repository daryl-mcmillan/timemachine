function render_data() {
  var raw = document.getElementById("rawdata").value;
  var pattern = document.getElementById("pattern").value;
  
  var matcher = new RegExp(pattern,"gim");
  var matches = raw.match(matcher);
  if( !matches ) {
    return;
  }
  var matchList = ""
  for( var i=0; i<matches.length; i++ ) {
    var m = matches[i];
    var d = Date.parse(m);
    if(d) {
      d = new Date(d);
      matchList += d.toISOString() + "\n";
    } else {
      console.log( {bad:m} );
    }
  }
  var parsed = document.getElementById("parsed");
  parsed.innerText = matchList;
}