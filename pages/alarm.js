import React, {Component} from 'react'

class Alarm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      currentTime: '',
      alarmTime: ''
    };
    this.Set_Alarm_Time = this.Set_Alarm_Time.bind(this);
  }

  componentDidMount(){
    this.clock = setInterval(
      () => this.Set_Current_Time(),
      1000
    )
    this.interval = setInterval(
      () => this.checkAlarmClock(),
    1000)
  }

  componentWillUnmount(){
  clearInterval(this.clock);
  clearInterval(this.interval);
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

  render() {
    return (
      <div>
        <h1>Your Alarm Clock</h1>
        <h2>currentTime: {this.state.currentTime}.
        </h2>
        <h2>{this.alarmMessage}
        </h2>
        <form>
          <input type="time" onChange={this.Set_Alarm_Time}></input>
        </form>
      </div>
    );
  }
}

export default Alarm
