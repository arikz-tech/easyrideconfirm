
window.onload = function () {
  var etAddress = document.getElementById("etAddress");
  var index = getParameterFromURL("index");
  var rid = getParameterFromURL("rid");

  getLocation();

  var btnConfirm = document.getElementById("btnConfirm");
  btnConfirm.addEventListener("click", function () {
    sendRequest(rid,index, etAddress.value);
  });

  function sendRequest(rid, index, address) {
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({ 'address': address }, function (results, status) {

      if (status == google.maps.GeocoderStatus.OK) {
        var latitude = results[0].geometry.location.lat();
        var longitude = results[0].geometry.location.lng();
      }

      if (latitude = undefined || longitude == undefined) {
        alert("Cant find the adress you have entered");
      } else {
        window.open("https://us-central1-easyride-ce6b4.cloudfunctions.net/confirmRide?"
          + "rid=" + rid
          + "&index" + index
          + "&lat" + latitude
          + "&lng" + longitude,
          "_self").close;
      }
    });
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
        console.log("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        console.log("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        console.log("An unknown error occurred.");
        break;
    }
  }

  function getParameterFromURL(parameter) {
    let paramter = new URLSearchParams(window.location.search);
    var par = parameter;
    return paramter.get(par)
  }

};