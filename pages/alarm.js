import React, {Component} from 'react'
import Link from 'next/link'
import Layout from '../components/Layout.js'

class Alarm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      currentTime: '',
      alarmTime: '',
      day: '',
      busStop: ''
    };
    this.Set_Alarm_Time = this.Set_Alarm_Time.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setAlarm = this.setAlarm.bind(this);
  }

  // componentDidMount(){
  //   this.clock = setInterval(
  //     () => this.Set_Current_Time(),
  //     1000
  //   )
  //   this.interval = setInterval(
  //     () => this.checkAlarmClock(),
  //   1000)
  // }
  //
  // componentWillUnmount(){
  // clearInterval(this.clock);
  // clearInterval(this.interval);
  // }

  handleChange (name) {
    return event => {
      const {currentTarget} = event;
      console.log("name: ", name)
      console.log("currentTarget: ", currentTarget.value)
      this.setState({[name]: currentTarget.value});
    };
  }

  Set_Current_Time(){
    this.setState({
      currentTime: new Date().toLocaleTimeString('en-US', { hour12: false })
    });
  }

  Set_Alarm_Time(event) {
    event.preventDefault();
    const inputAlarmTimeModified = event.target.value + ':00'
    this.setState({
      alarmTime: inputAlarmTimeModified
    })
  }

  checkAlarmClock(){
    if(this.state.alarmTime == 'undefined' || !this.state.alarmTime) {
      this.alarmMessage = "Pls set your alarm.";
    } else {
      this.alarmMessage = "Your alarm is set for " + this.state.alarmTime + ".";
      if(this.state.currentTime === this.state.alarmTime) {
        window.location.href = "https://www.freespecialeffects.co.uk/soundfx/sirens/alarm_01.wav";
      } else {
        console.log("not yet");
      }
    }
  }

  setAlarm(event) {
    event.preventDefault();
    const {alarmTime, day, busStop} = this.state;
    const alarmTimeArr = alarmTime.split(':')
    if(alarmTimeArr[0] === "00") {
      alarmTimeArr[0] = "0"
    }
    const alarmSchedule = {hour: parseInt(alarmTimeArr[0]), minute: parseInt(alarmTimeArr[1]), dayOfWeek: parseInt(day)}
    console.log(alarmSchedule);
    axios.post('/user/alarm', {alarmSchedule, busStop})
  }

  render() {
    return (
      <Layout>
        <h1>Your Alarm Clock</h1>
        <h2>currentTime: {this.state.currentTime}.
        </h2>
        <h2>{this.alarmMessage}
        </h2>
        <form onSubmit={this.setAlarm}>
          Time: <input key="1" type="time" name="alarmTime" onChange={this.handleChange('alarmTime')}></input> <br/>
          Bus stop: <input key="2" type="number" name="busStop" placeholder="#####" onChange={this.handleChange('busStop')}></input> <br/>
          Days:
          <input key="3" type="radio" name="day" value="1" onChange={this.handleChange('day')}/> Mon
          <input key="4" type="radio" name="day" value="2" onChange={this.handleChange('day')}/> Tues
          <input key="5" type="radio" name="day" value="3" onChange={this.handleChange('day')}/> Wed
          <input key="6" type="radio" name="day" value="4" onChange={this.handleChange('day')}/> Thurs
          <input key="7" type="radio" name="day" value="5" onChange={this.handleChange('day')}/> Fri
          <input key="8" type="radio" name="day" value="6" onChange={this.handleChange('day')}/> Sat
          <input key="9" type="radio" name="day" value="7" onChange={this.handleChange('day')}/> Sun <br/>
          <input type='submit' value='saveAlarm'/>
          <Link as={`/alarm`} href={`/alarm`}><a>Save</a></Link>
        </form>
      </Layout>
    );
  }
}

export default Alarm
