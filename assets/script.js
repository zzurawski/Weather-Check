let search = $(".submit");
//let data = JSON.parse(localStorage.getItem('preWeather'));
//api link building
let apiBase = "https://api.openweathermap.org/";
let apiKey = "83a44da7964246bbf900a3b2168f29ce";
let apiBaseWeather = apiBase + "data/2.5/forecast?";
let apiBaseLatLon = apiBase + "geo/1.0/direct?";
let apiBaseToday = apiBase + "data/2.5/weather?";
let apiLatLon = `${apiBaseLatLon}q=${city},Ohio&limit=10&appid=${apiKey}`;
let latLong;

 let searchEvent = (event) => {
    let data = {};
    event.preventDefault();
    city = $("#city").val();
    localStorage.setItem('preWeather', JSON.stringify(data));
    getWeather()
  };

search.on('click', searchEvent);


function getLatLon(geoJson, city) {
  for (let i=0; i<geoJson.length; i++) {
    if (geoJson[i]["city"] == city) {
      return [geoJson[i]["lat"].toFixed(2)
	      ,geoJson[i]["lon"].toFixed(2)];
    }
  }
  return console.log("Please enter a valid city!");
}

function pullStats(weatherEntry) {
  let newWeather = {date:"",
	       icon:"",
	       temp:"",
	       wind:"",
	       humidity:""
	      };
  let date = new Date(weatherEntry["dt"]*1000);
  newWeather["date"] = ('0'+(date.getMonth()+1)) +'/'+('0'+date.getDate());
  newWeather["icon"] = weatherEntry["weather"][0]["icon"];
  newWeather["temp"] = weatherEntry["main"]["temp"];
  newWeather["wind"] = weatherEntry["wind"]["speed"];
  newWeather["humidity"] = weatherEntry["main"]["humidity"];
  return newWeather;
};

function getWeather() {
    let apiCords = `${apiBaseLatLon}q=${city},Ohio&limit=10&appid=${apiKey}`;
     fetch(apiCords)
      .then(response => response.json())
      .then((info) =>{
        latLong = getLatLon(info,"Ohio");
        let apiWeather = `${apiBaseWeather}lat=${latLong[0]}&lon=${latLong[1]}&units=imperial&appid=${apiKey}`;
        fetch(apiWeather)
      .then(response => response.json())
      .then((info) => {
        localStorage.setItem("weatherResponse", JSON.stringify(data["list"]));
        let weatherData = info["list"];
        for (let i=0; i<weatherData.length; i++) {
          let readingTime = (weatherData[i]["dt_txt"]).split(" ")[1];
          if (readingTime === "12:00:00"){
            buildForecast(pullStats(weatherData[i]));
          }
        }
      });
      });
    //let latLongObject = {latLon: latLong};
    //data = Object.assign(data,latLongObject);

    //localStorage.setItem("data",JSON.stringify(data));
    return 0;
  }

function buildForecast(weather) {
    let weekForecast = $("#weatherdisplay");
    let section = $("<section>");
    let date = $("<section>").text("DATE:");
    let icon = $("<img>");
    let temp = $("<section>");
    let wind = $("<section>");
    let humidity = $("<section>");
  
    date.text("Date: " + weather["date"]);
    icon.attr("src","http://openweathermap.org/img/wn/"+weather["icon"]+".png")
    temp.text("Temperature: " +weather["temp"]);
    wind.text("Wind speed: " + weather["wind"]);
    humidity.text("Humidity: " +weather["humidity"]);
  
    section.attr("class","box has-background-info has-text-black");
    section.attr("style","margin-bottom: 1.5rem; padding: 0.5rem;");
    section.append(date);
    section.append(icon);
    section.append(temp);
    section.append(wind);
    section.append(humidity);
    weekForecast.append(section);
    return 0;
  }

 
