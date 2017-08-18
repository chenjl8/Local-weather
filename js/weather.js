// get local position

if ("geolocation" in navigator) {
  $('#weather').show();
} else {
  alert("Not support HTML5 geolocation function!")
}
var unit = 'f';
var altUnit ='c';
$(document).ready(function() {

  navigator.geolocation.getCurrentPosition(function(position) {
    loadWeather(position.coords.latitude+','+position.coords.longitude); //load weather using your lat/lng coordinates
  });

});

$('#convert').click(function(){
   var newUnit = unit === 'f'? 'c':'f';
   var newAltUnit = altUnit === 'c'? 'f':'c';
  $('#convert').text(String.fromCharCode(176)+ unit.toUpperCase());
  unit = newUnit;
  altUnit = newAltUnit;

navigator.geolocation.getCurrentPosition(function(position) {
    loadWeather(position.coords.latitude+','+position.coords.longitude); //load weather using your lat/lng coordinates
  });


  });




function loadWeather(location, woeid) {
  $.simpleWeather({
    location: location,
    woeid: woeid,
    unit: unit,
    success: function(weather) {
      if (unit === 'f' && altUnit ==='c'){
      if(weather.temp > 86 || weather.alt.temp > 30) {
        $('body').animate({backgroundColor: '#F7AC57'}, 1500);
      } else {
        $('body').animate({backgroundColor: '#0091c2'}, 1500);
      }

      }

       if (unit === 'c' && altUnit ==='f'){
      if(weather.temp > 30 || weather.alt.temp > 86) {
        $('body').animate({backgroundColor: '#F7AC57'}, 1500);
      } else {
        $('body').animate({backgroundColor: '#0091c2'}, 1500);
      }

      }
      html = '<h2><i class="wi wi-yahoo-'+weather.code+'"></i>'    +weather.temp+'&deg;'+weather.units.temp+'</h2>';
      html += '<ul><li>'+weather.city+', '+weather.region+'</li>';
      html += '<li class="currently">'+weather.currently+'</li>';
      html += '<li>'+weather.alt.temp+'&deg;'+altUnit+'</li></ul>';
       var timestamp = moment(weather.updated);
      html += 'Weather updated '+moment(timestamp).fromNow();

      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
}
