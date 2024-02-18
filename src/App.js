import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      break_length: 5,
      session_length: 25 * 60,// converted minutes to seconds
    };
    this.increment_break_length = this.increment_break_length.bind(this);
    this.increment_session_length = this.increment_session_length.bind(this);
    this.decrement_break_length = this.decrement_break_length.bind(this);
    this.decrement_session_length = this.decrement_session_length.bind(this);
    // this.reset = this.reset.bind(this)
  }
  increment_break_length() {
    this.setState((state) => ({
      break_length: state.break_length + 1,
    }));
  }
  increment_session_length() {
    this.setState((state) => ({
      session_length: state.session_length + 60,// increasing by 1 minute
    }));
  }
  decrement_break_length() {
    this.setState((state) => ({
      break_length: state.break_length > 1 ? state.break_length - 1 : 1,
    }));
  }
  decrement_session_length() {
    this.setState((state) => ({
      session_length: state.session_length > 60 ? state.session_length - 60 : 60,
    }));
  }
  formatTime(seconds) {
    const minutes = Math.floor(seconds/60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, 0)}: ${remainingSeconds.toString().padStart(2, 0)}`
  }
  render() {
    return (
      <div className="clock-block">
        <div className="main-title">25 + 5 clock</div>
        <div className="length-control">
          <div id="break-label">Break Length</div>
          <button
            className="btn-level"
            id="break-decrement"
            onClick={this.decrement_break_length}
            value="-"
          >
            <i className="fa fa-arrow-down fa-2x"></i>
          </button>
          <div className="btn-level" id="break-length">
            {this.state.break_length}
          </div>
          <button
            className="btn-level"
            id="break-increment"
            onClick={this.increment_break_length}
            value="+"
          >
            <i className="fa fa-arrow-up fa-2x"></i>
          </button>
        </div>
        <div className="length-control">
          <div id="session-label">Session Length</div>
          <button className="btn-level" id="session-decrement" onClick={this.decrement_session_length} value="-">
            <i className="fa fa-arrow-down fa-2x"></i>
          </button>
          <div className="btn-level" id="session-length">
            {Math.floor(this.state.session_length)/60} {/*convert seconds to minutes*/}
          </div>
          <button className="btn-level" id="session-increment" onClick={this.increment_session_length} value="+">
            <i className="fa fa-arrow-up fa-2x"></i>
          </button>
        </div>
        <div className="timer">
          <div className="timer-wrapper">
            <div id="timer-label">Session</div>
            <div id="time-left">{this.formatTime(this.state.session_length)}</div>
          </div>
        </div>
        <div className="timer-control">
          <button id="start_stop">
            <i className="fa fa-play fa-2x"></i>
            <i className="fa fa-pause fa-2x"></i>
          </button>
          <button id="reset">
            <i className="fa fa-refresh fa-2x"></i>
          </button>
        </div>
        <div className="author">
          {" "}
          Designed and Coded by <br />
          Newton Alumaa
        </div>
      </div>
    );
  }
}
export default App;
