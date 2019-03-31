import React, {Component} from 'react'
import Link from 'next/link'
import Layout from '../components/Layout.js'

class Search extends Component {
  constructor (props) {
    super(props);

    this.state = {
      busStop: "",
      estimates: []
    };

    this.handleChange = this.handleChange.bind(this);
  }

  static async getInitialProps({ query }) {
    return query
  }

  handleChange (name) {
    return event => {
      const {currentTarget} = event;
      this.setState({[name]: currentTarget.value});
    };
  }

  render () {
    const {busStop} = this.state;
    let keyCount = 0;
    return (
      <Layout>
        <div>
          <input
            value={busStop}
            onChange={this.handleChange('busStop')}
            type='busStop'
            id='busStop'
            name='busStop'
            placeholder="enter 5 digit bus stop"
          />
          <Link as={`/search/${busStop}`} href={`/search/${busStop}`}><a>server search</a></Link>
        </div>
        <div>
        {
          this.props.estimates ?
          (typeof this.props.estimates === "string" ?
          <li>{this.props.estimates}</li> :
          this.props.estimates.map(estimate => (
            <ul key={keyCount++}>
              <li>{estimate.RouteNo}:
              {
                estimate.Schedules.map(schedule => (
                  <span key={keyCount++}>{schedule.ExpectedLeaveTime}</span>
                ))
              }
              </li>
            </ul>
          ))): <ul key={keyCount++}></ul>
        }
        </div>
      </Layout>
    )
  }
}

export default Search
