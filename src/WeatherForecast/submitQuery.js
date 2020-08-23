import React from 'react';
import './weatherForecast.css';
import { FaSearch } from 'react-icons/fa';
export default class SubmitQuery extends React.Component{
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(e) {
    e.preventDefault();
    this.props.onClick();
  }

  render() {
    return (
    <div className="symbol">
      <button type="submit" className="searchSymbol btn btn-primary" onClick={this.handleOnClick}><FaSearch/></button>
    </div>);
  }

}
