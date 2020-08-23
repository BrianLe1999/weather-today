import React from 'react';
import "./searchLocation.css";
import {cityNames} from './listCity.js'; // import cityNames from the list of cities
import ReactHTMLDatalist from "react-html-datalist";



export default class SearchLocation extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.state = {
      cityInfo: []
    };

  }
  async handleOnChange(e) {
    this.setState({[e.target.name]: e.target.value});
    await this.props.onChange(e.target.value);
  }


  render() {
    var options = [];
    for (let i = 0; i < cityNames.length; i++) {
      var option = {
        text: `${cityNames[i].name}, ${cityNames[i].state}, ${cityNames[i].country}`,
        value: [cityNames[i].name, cityNames[i].state, cityNames[i].country, cityNames[i].coord.lon, cityNames[i].coord.lat]
      }
      options.push(option);
    }

    return (
        <div className="searchLocation">
          <ReactHTMLDatalist
              name={"cityInfo"}
              onChange={this.handleOnChange}
              classNames={"searchBox classtwo"}
              options={options}
              />
        </div>
    );
  }


}
