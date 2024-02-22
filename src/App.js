import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      break_length: 5 * 60,
      initial_break_length: 5 * 60,
      session_length: 25 * 60, // converted minutes to seconds
      initial_session_length: 25 * 60,
      timeTicking: false,
    };
    this.increment_break_length = this.increment_break_length.bind(this);
    this.increment_session_length = this.increment_session_length.bind(this);
    this.decrement_break_length = this.decrement_break_length.bind(this);
    this.decrement_session_length = this.decrement_session_length.bind(this);
    this.reset = this.reset.bind(this);
    this.tick = this.tick.bind(this);
  }
  increment_break_length() {
    this.setState((prevState) => {
      if (prevState.break_length < 3600) {
        // If break_length is less than 60 seconds, increment it
        return {
          break_length: prevState.break_length + 60,
          initial_break_length: prevState.initial_break_length + 60,
        };
      } else {
        // If break_length is already 60 seconds, don't change it
        return null;
      }
    });
  }

  increment_session_length() {
    this.setState((prevState) => {
      if (prevState.session_length < 3600) {
        return {
          session_length: prevState.session_length + 60, // increasing by 1 minute
          initial_session_length: prevState.initial_session_length + 60,
        };
      } else {
        return null;
      }
    });
  }
  decrement_break_length() {
    this.setState((prevState) => ({
      break_length:
        prevState.break_length > 60 ? prevState.break_length - 60 : 60,
      initial_break_length:
        prevState.initial_break_length > 60
          ? prevState.initial_break_length - 60
          : 60,
    }));
  }
  decrement_session_length() {
    this.setState((prevState) => ({
      session_length:
        prevState.session_length > 60 ? prevState.session_length - 60 : 60,
      initial_session_length:
        prevState.initial_session_length > 60
          ? prevState.initial_session_length - 60
          : 60,
    }));
  }
  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  }
  reset() {
    clearInterval(this.timerID);
    this.setState({
      timeTicking: false,
      break_length: 5 * 60,
      initial_break_length: 5 * 60,
      session_length: 25 * 60,
      initial_session_length: 25 * 60,
    });
  }

  startTimer() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  stopTimer() {
    clearInterval(this.timerID);
  }

  componentDidUpdate(propState, prevState) {
    if (prevState.timeTicking !== this.state.timeTicking) {
      if (this.state.timeTicking) {
        this.startTimer();
      } else {
        this.stopTimer()
      }
    }
  }

  tick() {
    if (this.state.timeTicking) {
      this.setState((prevState) => {
        if (prevState.session_length >= 0) {
          return { session_length: prevState.session_length - 1 };
        } else if (prevState.break_length > 0) {
          return { break_length: prevState.break_length - 1 };
        } else {
          return {
            session_length: this.state.initial_session_length,
            break_length: this.state.initial_break_length,
          };
        }
      });
    }
  }

  render() {
    const redSession = this.state.session_length <= 59;
    const redBreak = this.state.break_length <= 59;

    return (
      <div className="clock-block">
        <div className="main-title">25 + 5 clock</div>
        <div className="length-control">
          <div id="break-label">Break Length.</div>
          <button
            className="btn-level"
            id="break-decrement"
            onClick={this.decrement_break_length}
            value="-"
          >
            <i className="fa fa-arrow-down fa-2x"></i>
          </button>
          <div className="btn-level" id="break-length">
            {Math.floor(this.state.initial_break_length / 60)}
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
          <button
            className="btn-level"
            id="session-decrement"
            onClick={this.decrement_session_length}
            value="-"
          >
            <i className="fa fa-arrow-down fa-2x"></i>
          </button>
          <div className="btn-level" id="session-length">
            {Math.floor(this.state.initial_session_length / 60)}
            {/*convert seconds to minutes*/}
          </div>
          <button
            className="btn-level"
            id="session-increment"
            onClick={this.increment_session_length}
            value="+"
          >
            <i className="fa fa-arrow-up fa-2x"></i>
          </button>
        </div>
        <div className="timer">
          <div className="timer-wrapper">
            <div
              id="timer-label"
              className={`${
                this.state.session_length >= 0
                  ? redSession
                    ? "session-label-red"
                    : ""
                  : ""
              } ${
                this.state.break_length >= 0
                  ? redBreak
                    ? "session-label-red"
                    : ""
                  : ""
              }`}
            >
              {this.state.session_length >= 0 ? "Session" : "Break"}
            </div>
            <div
              id="time-left"
              className={`${
                this.state.session_length >= 0
                  ? redSession || redBreak
                    ? "session-label-red"
                    : ""
                  : ""
              } ${
                this.state.break_length >= 0
                  ? redBreak
                    ? "session-label-red"
                    : ""
                  : ""
              }`}
            >
              {this.formatTime(
                this.state.session_length >= 0
                  ? this.state.session_length
                  : this.state.break_length
              )}
            </div>
          </div>
        </div>
        <div className="timer-control">
        <button
            id="start_stop"
            onClick={() => this.setState({ timeTicking: true })}
          >
            <i className="fa fa-play fa-2x"></i>
          </button>
          <button
            id="start_stop"
            onClick={() => this.setState({ timeTicking: false })}
          >
            <i className="fa fa-pause fa-2x"></i>
          </button>
          <button id="reset" onClick={this.reset}>
            <i className="fa fa-refresh fa-2x"></i>
          </button>
        </div>
        <div className="author">
          {" "}
          Designed and Coded by <br />
          Newton Alumasa
        </div>
        <audio id="beep" preload="auto" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"></audio>
      </div>
    );
  }
}
export default App;
