import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="clock-block">
        <div className="main-title">25 + 5 clock</div>
        <div className="length-control">
          <div id="break-label">Break Length</div>
          <button className="btn-level" id="break-decrement" value="-">
            <i className="fa fa-arrow-down fa-2x"></i>
          </button>
          <div className="btn-level" id="break-length">
            5
          </div>
          <button className="btn-level" id="break-increment" value="+">
            <i className="fa fa-arrow-up fa-2x"></i>
          </button>
        </div>
      </div>
    );
  }
}
export default App;
