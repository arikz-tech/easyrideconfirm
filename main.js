
window.onload = function () {
  var etAddress = document.getElementById("etAddress");
  var index = getParameterFromURL("index");
  var rid = getParameterFromURL("rid");

  document.getElementById("onConfirm").style.display = "none";
  document.getElementById("onReject").style.display = "none";
  document.getElementById("pb").style.display = "none";

  getLocation();

  var btnConfirm = document.getElementById("btnConfirm");
  btnConfirm.addEventListener("click", function () {
    sendRequest(rid, index, etAddress.value);
  });

  function sendRequest(rid, index, address) {
    document.getElementById("pb").style.display = "block";
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, function (results, status) {

      if (status == google.maps.GeocoderStatus.OK) {
        var latitude = results[0].geometry.location.lat();
        var longitude = results[0].geometry.location.lng();
      }
      if (latitude == undefined || longitude == undefined) {
        alert("Cant find the adress you have entered");
      } else {
        console.log("lat=" + latitude + " lng=" + longitude);
        var proxy = "https://cors-anywhere.herokuapp.com/";
        var url = "https://us-central1-easyride-ce6b4.cloudfunctions.net/confirmRide?"
          + "rid=" + rid
          + "&index=" + index
          + "&lat=" + latitude
          + "&lng=" + longitude;  
        var promise = fetch(proxy + url)
          .then(res => {
            if (res.ok) {
              console.log("SUCCESS");
              document.getElementById("onConfirm").style.display = "block";
            } else {
              console.log("ERROR");
              document.getElementById("onReject").style.display = "block";
            }
            document.getElementById("title").style.display = "none";
            document.getElementById("body").style.display = "none";
            document.getElementById("addressLabel").style.display = "none";
            document.getElementById("confirmLabel").style.display = "none";
            document.getElementById("container").style.display = "none";
            document.getElementById("pb").style.display = "none";
          })
          .catch(error =>{
            console.log("ERROR");
            document.getElementById("onReject").style.display = "block";
          });
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

  function getLang() {
    if (navigator.languages != undefined)
      return navigator.languages[0];
    else
      return navigator.language;
  }

  function changeLang() {
    var lang = getLang();
    if (lang == "he-IL") {
      document.getElementById("title").innerHTML = "הזמנה לנסיעה";
      document.getElementById("body").innerHTML = "הוזמנת לנסיעה חדשה, לאישור הגעה הכנס כתובת בשדה ולחץ על הכפתור \"אישור נסיעה\"";
      document.getElementById("addressLabel").innerHTML = "מיקום איסוף";
      document.getElementById("confirmLabel").innerHTML = "אישור נסיעה";
      document.getElementById("onConfirm").innerHTML = "נסיעה אושרה בהצלחה";
      document.getElementById("onReject").innerHTML = "שגיאה בתהליך אישור נסיעה";
    }
  }

  changeLang();

};