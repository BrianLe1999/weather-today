import React from 'react';
import './weatherForecast.css';
export default class ChangeUnit extends React.Component{
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.changeLabel = this.changeLabel.bind(this);
    this.state = {
      unit: this.props.unit
    }
  }
  componentDidMount() {
    this.changeLabel();
  }

  componentDidUpdate() {
    this.changeLabel();
  }

  handleOnClick(e) {
    let newUnit = this.props.unit === "metric"? "imperial" : "metric";
    this.setState({unit: newUnit});
    this.props.onClick(newUnit);
  }

  changeLabel() {
    let button = document.getElementById('change-unit-btn');
    if (this.state.unit === "metric") {
      button.textContent = "°C";
    }
    else {
      button.textContent = "°F";
    }
  }

  render() {
    return (
      <button id="change-unit-btn" className="btn btn-primary change-btn" onClick={this.handleOnClick}></button>
    )
  }
}
