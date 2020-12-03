
window.onload = function () {
  var address = document.getElementById("etAddress").value;
  var index = getParameterFromURL("index");
  var rid = getParameterFromURL("rid");
  var uid = getParameterFromURL("uid");

  getLocation();

  var btnConfirm = document.getElementById("btnConfirm");
  btnConfirm.addEventListener("click", function () {
    sendRequest(rid, uid, index, address);
  });

  function sendRequest(rid, uid, index, address) {
    window.open("https://us-central1-easyride-ce6b4.cloudfunctions.net/confirmRide?"
        + "rid=" + rid
        + "&uid=" + uid
        + "&index=" + index
        + "&address=" + address,
        "_self");
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    }
  }

  function showPosition(position) {
    var geocoder = new google.maps.Geocoder();
    var location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    geocoder.geocode({ 'latLng': location }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var result = results[0].formatted_address;
        etAddress.value = result;
      }
    });
  }

  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        x.innerHTML = "User denied the request for Geolocation."
        break;
      case error.POSITION_UNAVAILABLE:
        x.innerHTML = "Location information is unavailable."
        break;
      case error.TIMEOUT:
        x.innerHTML = "The request to get user location timed out."
        break;
      case error.UNKNOWN_ERROR:
        x.innerHTML = "An unknown error occurred."
        break;
    }
  }

  function getParameterFromURL(parameter) {
    let paramter = new URLSearchParams(window.location.search);
    var par = parameter;
    return paramter.get(par)
  }

};