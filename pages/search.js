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
    const {busStop, estimates} = this.state;

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
            <ul>
              <li>{estimate.RouteNo}:
              {
                estimate.Schedules.map(schedule => (
                  <span>{schedule.ExpectedLeaveTime}</span>
                ))
              }
              </li>
            </ul>
          ))): <ul></ul>
        }
        </div>
      </Layout>
    )
  }
}

export default Search
