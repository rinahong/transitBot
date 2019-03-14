import React, {Component} from 'react'
import axios from 'axios';
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

import {RTTIEstimates} from '../requests/RTTIEstimates'

const proxyurl = "https://cors-anywhere.herokuapp.com/";

class Search extends Component {
  constructor (props) {
    super(props);

    this.state = {
      busStop: "",
      estimates: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.searchBusStop = this.searchBusStop.bind(this);
  }

  handleChange (name) {
    return event => {
      const {currentTarget} = event;
      console.log("ct", name, currentTarget)
      this.setState({[name]: currentTarget.value});
    };
  }

   searchBusStop(event) {
    const {busStop} = this.state;
    console.log("bs: ",busStop)

    RTTIEstimates
    .get(busStop)
      .then(res => {
          console.log(res)
          this.setState({ estimates: res })
      })

    event.preventDefault();
    }

  render () {
    const {busStop} = this.state;
    return (
      <main>
        <div>
          <form onSubmit={this.searchBusStop}>
              <input
                value={busStop}
                onChange={this.handleChange('busStop')}
                type='busStop'
                id='busStop'
                name='busStop'
                placeholder="enter 5 digit bus stop"
              />
              <input type='submit' value='Search'/>
          </form>
        </div>
        <div>
        {
          this.state.estimates.map(estimate => (
            <ul>
              <li>{estimate.RouteNo}:
              {
                estimate.Schedules.map(schedule => (
                  <span>{schedule.ExpectedLeaveTime}</span>
                ))
              }
              </li>
            </ul>
          ))
        }
        </div>
      </main>
    )
  }
}

export default Search
