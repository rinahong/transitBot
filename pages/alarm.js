import React, {Component} from 'react'
import Link from 'next/link'
import Layout from '../components/Layout.js'
import axios from 'axios';

class Alarm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      alarmTime: '',
      day: '',
      busStop: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.setAlarm = this.setAlarm.bind(this);
  }

  static getInitialProps({query}) {
      return query
  }

  handleChange (name) {
    return event => {
      const {currentTarget} = event;
      this.setState({[name]: currentTarget.value});
    };
  }

  setAlarm(event) {
    event.preventDefault();
    const {alarmTime, day, busStop} = this.state;
    const alarmTimeArr = alarmTime.split(':')
    if(alarmTimeArr[0] === "00") {
      alarmTimeArr[0] = "0"
    }
    const alarmSchedule = {hour: parseInt(alarmTimeArr[0]), minute: parseInt(alarmTimeArr[1]), dayOfWeek: parseInt(day)}
    axios.post('/alarm', {alarmSchedule, busStop})
  }

  render() {
    return (
      <Layout>
        <h1>Your Alarm Clock</h1>
        <form onSubmit={this.setAlarm}>
          Time: <input key="1" type="time" id="alarmTime" name="alarmTime" onChange={this.handleChange('alarmTime')}></input> <br/>
          Bus stop: <input key="2" type="number" id="busStop" name="busStop" placeholder="#####" onChange={this.handleChange('busStop')}></input> <br/>
          Days:
          <input key="9" type="radio" name="day" value="0" onChange={this.handleChange('day')}/> Sun
          <input key="3" type="radio" name="day" value="1" onChange={this.handleChange('day')}/> Mon
          <input key="4" type="radio" name="day" value="2" onChange={this.handleChange('day')}/> Tues
          <input key="5" type="radio" name="day" value="3" onChange={this.handleChange('day')}/> Wed
          <input key="6" type="radio" name="day" value="4" onChange={this.handleChange('day')}/> Thurs
          <input key="7" type="radio" name="day" value="5" onChange={this.handleChange('day')}/> Fri
          <input key="8" type="radio" name="day" value="6" onChange={this.handleChange('day')}/> Sat <br/>

          <input type='submit' value='saveAlarm'/>
          <Link as={`/alarm`} href={`/alarm`}><a>Save</a></Link>
        </form>

      </Layout>
    );
  }
}

export default Alarm
