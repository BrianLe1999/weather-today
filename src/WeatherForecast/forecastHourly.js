import React from 'react';
import './weatherForecast.css';
export default class ForecastHourly extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnInput = this.handleOnInput.bind(this);
  }

  // set the marker to the current time whenever the location was changed
  componentDidUpdate() {
    let range_slider = document.getElementById("range-slider")
    range_slider.defaultValue = "0";
  }

  // handle changing of marker on the range slider
  handleOnInput(event){
    let selectedIndex = event.target.value;
    this.props.onInput(selectedIndex);
  }

  render() {
    return (
      <div>
        <input id="range-slider" type="range" min = "0" max = "23" list="hourmarks" onInput={this.handleOnInput} step="1"/>
        <datalist id="hourmarks">
          <option value="0"></option>
          <option value="1"></option>
          <option value="2"></option>
          <option value="3" ></option>
          <option value="4"></option>
          <option value="5"></option>
          <option value="6"></option>
          <option value="7"></option>
          <option value="8"></option>
          <option value="9"></option>
          <option value="10"></option>
          <option value="11"></option>
          <option value="12"></option>
          <option value="13"></option>
          <option value="14"></option>
          <option value="15"></option>
          <option value="16"></option>
          <option value="17"></option>
          <option value="18"></option>
          <option value="19"></option>
          <option value="20"></option>
          <option value="21"></option>
          <option value="22"></option>
          <option value="23"></option>
        </datalist>
      </div>

    );

  }
}
