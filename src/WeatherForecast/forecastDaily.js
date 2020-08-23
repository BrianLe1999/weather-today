import React from 'react';
import weatherIcons from './weatherIcons.js';
import './forecastDaily.css';

export default class ForecastDaily extends React.Component {
  findCorrectIcon(iconId) {
    for(let i = 0; i < weatherIcons.length; ++i) {
      if (weatherIcons[i].id === iconId) {
        return i;
      }
    }
  }

  render() {
    let mode;
    let symbol;
    // based on unit selected, display appropriate temperature
    if (this.props.unit === "metric") {
      mode = 0;
      symbol= "°C";
    }
    else {
      mode = 1;
      symbol = "°F"
    }
    // get dailyWeather passed to this component
    let dailyWeather = this.props.dailyWeather;
    let iconsArray = dailyWeather.map((element) => {
      return this.findCorrectIcon(element.icon);
    });

    return (
      <div className="seven-day-forecast">
        {dailyWeather.map((item, index) =>
        <div className="daily-forecast" key={index}>
          <p className="date item">{item.shortDate}</p>
          <img className="icon" src={weatherIcons[iconsArray[index]].src} alt={weatherIcons[iconsArray[index]].title} width="100px" height="100px"/>
          <p className="title item">{item.description}</p>
          <div className="temp">
            <div className="max item">
              <p className="max-temp">{item.highTemp[mode]} {symbol}</p>
            </div>
            <div className="min item">
              <p className="min-temp">{item.lowTemp[mode]} {symbol}</p>
            </div>
          </div>
        </div>)}
      </div>
    );
  }
}
