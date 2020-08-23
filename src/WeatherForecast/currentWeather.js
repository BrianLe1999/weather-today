import React from 'react';
import "./currentWeather.css";
import weatherIcons from './weatherIcons.js';


export default class CurrentWeather extends React.Component {

  findCorrectIcon(iconId) {
    for(let i = 0; i < weatherIcons.length; ++i) {
      if (weatherIcons[i].id === iconId) {
        return i;
      }
    }
  }

  render() {
    let mode;
    let symbol
    if (this.props.unit === "metric") {
      mode = 0;
      symbol= "°C";
    }
    else {
      mode = 1;
      symbol = "°F"
    }
    var iconIndex = this.findCorrectIcon(this.props.currentWeather.icon);
    let city = this.props.cityInfo;
    let place = city.name === city.state ? (city.name + ", " + city.country) : (city.name + ", " + city.state + ", " + city.country);
    return (
      <div className="current-weather">
        <div className="box">
          <div className="main-weather">
            <div className="location place-info">
              <p>{place}</p>
            </div>
            <div className="main-date place-info">
              <p>{this.props.currentWeather.time}, {this.props.currentWeather.date}</p>
            </div>
            <div className="main-current">
              <div className="weather-icon">
                <img src={weatherIcons[iconIndex].src} alt={weatherIcons[iconIndex].title} width="200px" height="200px"/>
              </div>
              <div className="temp-and-description">
                <div className="main-temp main-index">
                  <p>{this.props.currentWeather.temp[mode]} {symbol}</p>
                </div>
                <div className="description main-index">
                  <p>{this.props.currentWeather.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="box">
          <div className="auxiliary-weather">
            <div className="high-temp extra-index">
              <p>High</p>
              <p>{this.props.currentWeather.highTemp[mode]} {symbol}</p>
            </div>
            <div className="humidity extra-index">
              <p>Humidity</p>
              <p>{this.props.currentWeather.humidity}%</p>
            </div>
            <div className="sunrise extra-index">
              <p>Sunrise</p>
              <p>{this.props.currentWeather.sunRise}</p>
            </div>
            <div className="low-temp extra-index">
              <p>Low</p>
              <p>{this.props.currentWeather.lowTemp[mode]} {symbol}</p>
            </div>
            <div className="wind extra-index">
              <p>Wind</p>
              <p>{this.props.currentWeather.windDirection[mode]}</p>
            </div>
            <div className="sunset extra-index">
              <p>Sunset</p>
              <p>{this.props.currentWeather.sunSet}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
