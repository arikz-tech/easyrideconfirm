window.onload = function () {
  var parameterName;

  var btnConfirm = document.getElementById("btnConfirm");
  btnConfirm.addEventListener("click", function () {
    var address = document.getElementById("etAddress").value;
    var index = getParameterFromURL("index");
    var rid = getParameterFromURL("rid");
    var uid = getParameterFromURL("uid");
    var info = document.getElementById("info");
    sendRequest(rid,uid,index,address);
  });

  function sendRequest(rid,uid,index,address) {
    console.log("Rid=" + rid + " Index= " + index + " Address= " + address + " uid=" + uid);
    window.open("https://us-central1-easyride-ce6b4.cloudfunctions.net/confirmRide?" 
    + "rid=" + rid
    + "&uid=" + uid
    + "&index=" + index
    + "&address=" + address,
    "_self");
  }

  function getParameterFromURL(parameter) {
    let paramter = new URLSearchParams(window.location.search);
    var par = parameter;
    return paramter.get(par)
  }



};