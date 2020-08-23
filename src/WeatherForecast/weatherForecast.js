import React from 'react';
import './weatherForecast.css';
import SearchLocation from "./searchLocation.js"; // autocomplete for searching location
import SubmitQuery from "./submitQuery.js"; // search button
import CurrentWeather from "./currentWeather.js"; // component for displaying current weather
import ChangeUnit from "./changeUnit.js"; // change unit button
import ForecastHourly from "./forecastHourly.js"; // import the component for hourly forecast
import ForecastDaily from "./forecastDaily.js"; // import the component for daily forecast
import weatherIcons from "./weatherIcons.js"; // get weather icons and backgrounds

export default class WeatherForecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unit : "imperial", //imperial units or metric units
      // all information of current location
      cityInfo: {
        name: "Sacramento",
        state: "CA",
        country: "US",
        lon: -121.4944,
        lat: 38.58157
      },
      // current weather being displayed
      currentDisplayedWeather: {
        description : "clear sky",
        time: "1:22 PM",
        date: "Fri, Tue 23 2020",
        temp : [35,97],
        icon : "01d",
        highTemp : 105,
        lowTemp : 91,
        humidity : 23,
        windDirection:["", ""],
        sunRise:"",
        sunSet: "",
      },
      // an object containing current weather information
      currentWeatherInfo: null,
      // a 24-object array containing hourly weather forecast
      hourlyWeatherInfo: null,
      // a 7-element array containing seven-day weather forecast
      dailyWeatherInfo: null,
      // boolean value indicating whether weather data has been fetched
      isLoading: true,
      // error message
      error: {
        isError: false,
        errorMessage: ""
      },
    };
    this.changeUnit = this.changeUnit.bind(this);
    this.changeLocation = this.changeLocation.bind(this);
    this.changeCurrentDisplayedWeather = this.changeCurrentDisplayedWeather.bind(this);
    this.getWeatherData = this.getWeatherData.bind(this);
  }

  //fetch data when the page is rendered the first time
  componentDidMount() {
    this.getWeatherData();

  }

  // set the hourly marker to current weather when the page is rendered for the first time
  componentDidUpdate() {
    let range_slider = document.getElementById("range-slider")
    if (range_slider !== null){
        range_slider.defaultValue = "0";
    }
  }

  // find the correct icon and background for the corresponding icon code
  findCorrectIcon(iconId) {
    for(let i = 0; i < weatherIcons.length; ++i) {
      if (weatherIcons[i].id === iconId) {
        return i;
      }
    }
  }

  // handling changing location
  async changeLocation(newLocation) {
    const [name, state, country, lon, lat] = convertStringToArray(newLocation);
    const newCityInfo = {
      name: name,
      state: state,
      country: country,
      timezone: "",
      lon: lon,
      lat: lat
    }
    await this.setState({cityInfo: newCityInfo})
  }

  // handling changing unit
  async changeUnit(newUnit) {
    await this.setState({unit: newUnit});
  }

  async changeCurrentDisplayedWeather(newIndex) {
    let newWeather;
    if (newIndex === '0') {
      newWeather = this.state.currentWeatherInfo;
    }
    else {
      newWeather = this.state.hourlyWeatherInfo[newIndex];
    }
    await this.setState({currentDisplayedWeather: newWeather});
  }


  // function to fetch weather data
  async getWeatherData() {
    // indicating that the page is loading
    await this.setState({isLoading: true});
    // get longitude
    const lon = this.state.cityInfo.lon;
    // get latitude
    const lat = this.state.cityInfo.lat;
    // get API key
    const API_KEY = process.env.REACT_APP_API_KEY;
    // form URL for current weather call and one call API
    var currentURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    var forecastURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    // resolve both fetch APIs
    Promise.all([fetch(currentURL), fetch(forecastURL)])
    .then(([currentResponse, forecastResponse]) => {
      // resolve if both requests are ok
      if (currentResponse.ok && forecastResponse.ok) {
        return Promise.all([currentResponse.json(), forecastResponse.json()]);
      }
      // otherwise rejecting it
      else {
        return Promise.reject([currentResponse.status,forecastResponse.status]);
      }
    }).then(([currentData, forecastData]) => {
      // get city timezone for time conversion
      let newCityInfo = this.state.cityInfo;
      newCityInfo.timezone = forecastData.timezone;
      this.setState({cityInfo: newCityInfo});
      var forecastDaily = forecastData.daily;
      var forecastDailyInfo = [];
      // get current weather data
      const currentWeather = {
        description : capitalize(currentData.weather[0].description),
        time: toLocalTime(currentData.dt,this.state.cityInfo.timezone),
        date : convertSecondToDate(currentData.dt, this.state.cityInfo.timezone),
        temp : [Math.round(currentData.main.temp),toFahrenheit(currentData.main.temp)],
        icon : currentData.weather[0].icon,
        highTemp : [Math.round(forecastDaily[0].temp.max),toFahrenheit(forecastDaily[0].temp.max)],
        lowTemp : [Math.round(forecastDaily[0].temp.min),toFahrenheit(forecastDaily[0].temp.min)],
        humidity : currentData.main.humidity,
        windDirection: [getWindDirectionInMetric(currentData.wind.speed,currentData.wind.deg),getWindDirectionInImperial(currentData.wind.speed,currentData.wind.deg)],
        sunRise: toLocalTime(currentData.sys.sunrise, this.state.cityInfo.timezone),
        sunSet: toLocalTime(currentData.sys.sunset, this.state.cityInfo.timezone),
      }
      this.setState({currentDisplayedWeather: currentWeather});
      this.setState({currentWeatherInfo: currentWeather});
      var highTemp = this.state.currentDisplayedWeather.highTemp;
      var lowTemp = this.state.currentDisplayedWeather.lowTemp;
      var sunRise = this.state.currentDisplayedWeather.sunRise;
      var sunSet = this.state.currentDisplayedWeather.sunSet;
      const forecastHourly = forecastData.hourly;
      var forecastHourlyInfo = [];
      // get hourly weather forecast
      for (let i = 0; i < 24; ++i) {
        var hourlyWeather = {
          description : capitalize(forecastHourly[i].weather[0].description),
          time: toLocalTime(forecastHourly[i].dt, this.state.cityInfo.timezone),
          date : convertSecondToDate(forecastHourly[i].dt,this.state.cityInfo.timezone),
          temp : [Math.round(forecastHourly[i].temp),toFahrenheit(forecastHourly[i].temp)],
          icon : forecastHourly[i].weather[0].icon,
          highTemp : highTemp,
          lowTemp : lowTemp,
          humidity : forecastHourly[i].humidity,
          windDirection: [getWindDirectionInMetric(forecastHourly[i].wind_speed,forecastHourly[i].wind_deg),getWindDirectionInImperial(forecastHourly[i].wind_speed,forecastHourly[i].wind_deg)],
          sunRise: sunRise,
          sunSet: sunSet,
        }
        forecastHourlyInfo.push(hourlyWeather);
      }
      this.setState({hourlyWeatherInfo: forecastHourlyInfo});
      // get daily weather forecast
      for (let i = 0; i < forecastDaily.length; ++i) {
        var dailyWeather = {
          description: capitalize(forecastDaily[i].weather[0].description),
          shortDate: convertSecondToDate(forecastDaily[i].dt, this.state.cityInfo.timezone, true),
          highTemp: [Math.round(forecastDaily[i].temp.max),toFahrenheit(forecastDaily[i].temp.max)],
          lowTemp: [Math.round(forecastDaily[i].temp.min),toFahrenheit(forecastDaily[i].temp.min)],
          icon: forecastDaily[i].weather[0].icon
        }
        forecastDailyInfo.push(dailyWeather);
      }
      this.setState({dailyWeatherInfo: forecastDailyInfo});
      this.setState({isLoading: false});
    }).catch(([currentError, forecastError]) => {
      // set isError to true if errors occurred
      let newError = {
        isError: true,
        errorMessage: "",
      };
      // get error message based on the status code
      if (currentError === 400) {
        newError.errorMessage = "Please select one of the provided cities!";
      }
      else {
        newError.errorMessage = "Error occurred. Please retry!";
      }
      this.setState({error: newError});
      this.setState({isLoading: false});
    });
   }

  render() {
    // render this if the page is still loading
    if (this.state.isLoading) {
      return (
              <h1>Loading</h1>
      );
    }
    // render this if errors occurred
    else if (this.state.error.isError) {
      return (
        <div className="background">
              <div className="welcome">
                <h1 className="welcome-message">Welcome to Weather Today</h1>
              </div>
              <div className="search-bar">
                <div className="search-button">
                  <SearchLocation onChange={this.changeLocation}/>
                </div>
                <div className="query-btn">
                  <SubmitQuery onClick={this.getWeatherData}/>
                </div>
                <div className="change-unit-btn">
                  <ChangeUnit unit={this.state.unit} onClick={this.changeUnit}/>
                </div>
              </div>
              <div className="error">
                <h1 className="errorMessage">{this.state.error.errorMessage}</h1>
              </div>
        </div>

      )
    }
    // otherwise, display current weather, daily and hourly forecast
    else {
    let iconIndex = this.findCorrectIcon(this.state.currentDisplayedWeather.icon);
    return (
    <div style = {{backgroundImage: `url(${weatherIcons[iconIndex].background})`}}className="background">
          <div className="welcome">
            <h1 className="welcome-message">Welcome to Weather Today</h1>
          </div>
          <div className="search-bar">
            <div className="search-button">
              <SearchLocation onChange={this.changeLocation}/>
            </div>
            <div className="query-btn">
              <SubmitQuery onClick={this.getWeatherData}/>
            </div>
            <div className="change-unit-btn">
              <ChangeUnit unit={this.state.unit} onClick={this.changeUnit}/>
            </div>
          </div>
          <div className="current-displayed-weather">
            <CurrentWeather unit={this.state.unit} currentWeather={this.state.currentDisplayedWeather} cityInfo={this.state.cityInfo}/>
          </div>
          <div className="hourly-forecast-bar">
            <ForecastHourly hourlyWeather={this.state.hourlyWeatherInfo} onInput={this.changeCurrentDisplayedWeather} />
          </div>
          <div className="daily-forecast-bar">
            <ForecastDaily unit= {this.state.unit} dailyWeather={this.state.dailyWeatherInfo} />
          </div>
        </div>
    )};
 }
}

// function to capitalize weather description
function capitalize(s) {
  if (typeof s !== 'string')
    return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// function to convert celsius degree to fahrenheit degree
function toFahrenheit(celsius_degree) {
  return Math.round(celsius_degree * 9 / 5 + 32);
}

// function to get wind direction in km/h
function getWindDirectionInMetric(windSpeed, windDeg) {
  let direction = getWindDirectionFromDegree(windDeg);
  let windSpeedInKPH = Math.round(windSpeed * 3.6);
  let windDirection = "";
  windDirection = direction + " " + windSpeedInKPH + " kph";
  return windDirection;

}

// function to get win direction in mph
function getWindDirectionInImperial(windSpeed, windDeg) {
  let direction = getWindDirectionFromDegree(windDeg);
  let windSpeedInMPH = Math.round(windSpeed * 2.23694);
  let windDirection = "";
  windDirection = direction + " " + windSpeedInMPH + " mph";
  return windDirection;
}

// function to get wind direction from wind degree
function getWindDirectionFromDegree(windDeg) {
  if (windDeg >= 348.75 || windDeg < 11.25)
  {
    return "N";
  }
  else if (windDeg >= 11.25 && windDeg < 33.75)
  {
    return "NNE";
  }
  else if (windDeg >= 33.75 && windDeg < 56.25)
  {
    return "NE";
  }
  else if (windDeg >= 56.25 && windDeg < 78.75)
  {
    return "ENE";
  }
  else if (windDeg >= 78.75 && windDeg < 101.25)
  {
    return "E";
  }
  else if (windDeg >= 101.25 && windDeg < 123.75)
  {
    return "ESE";
  }
  else if (windDeg >= 123.75 && windDeg < 146.25)
  {
    return "SE";
  }
  else if (windDeg >= 146.25 && windDeg < 168.75)
  {
    return "SSE";
  }
  else if (windDeg >= 168.75 && windDeg < 191.25)
  {
    return "S";
  }
  else if (windDeg >= 191.25 && windDeg < 213.75)
  {
    return "SSW";
  }
  else if (windDeg >= 213.75 && windDeg < 236.25)
  {
    return "SW";
  }
  else if (windDeg >= 236.25 && windDeg < 258.75)
  {
    return "WSW";
  }
  else if (windDeg >= 258.75 && windDeg < 281.25)
  {
    return "W";
  }
  else if (windDeg >= 281.25 && windDeg < 303.75)
  {
    return "WNW";
  }
  else if (windDeg >= 303.75 && windDeg < 326.25)
  {
    return "NW";
  }
  else if (windDeg >= 326.25 && windDeg < 348.75)
  {
    return "NNW";
  }
  else {
    return "Out of range";
  }

}

// function to convert # of seconds to local time based on timezone
function toLocalTime(sec,timeZone) {
  let countryCode = "en-US";
  var options = {timeZone: timeZone, hour: '2-digit', minute: '2-digit'};
  let date = new Date(sec* 1000);
  return date.toLocaleTimeString(countryCode, options);
}


// function to convert # of seconds to date based on timeZone
// isShort is set to true if we only need weekday, day, and month but not year
function convertSecondToDate(sec, timeZone, isShort) {
  let date = new Date(sec * 1000);
  let options;
  if (isShort) {
    options = {timeZone: timeZone, weekday: 'short', month: 'short', day: 'numeric'};
  }
  else {
    options = {timeZone: timeZone, weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  }
  let countryCode = "en-US";
  return date.toLocaleDateString(countryCode, options);
}



// function to string form to array form
// i.e: "A, B, C, D, E" => ["A", "B", "C", "D", "E"]
function convertStringToArray(string) {
  let name="", state="", country="", lon="", lat="";
  let commaPosition = 0;
  for(let i = 0; i < string.length; ++i) {
    if (string[i] === ',') {
      ++commaPosition;
      continue;
    }
    switch(commaPosition) {
      case 0:
          name += string[i];
          break;
      case 1:
          state += string[i];
          break;
      case 2:
          country += string[i];
          break;
      case 3:
          lon += string[i];
          break;
      case 4:
          lat += string[i];
          break;
      default:
          break;
    }
  }

  return [name, state, country, lon, lat];
}
