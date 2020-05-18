import React from 'react';
import { BrowserRouter as Router, Link, Switch } from 'react';

class TrackingNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
        username: "hello"
    })
  }

  render() {
      return(
        <div>
            <h1>{this.state.username}</h1>
            <h1>TrackingNew</h1>
        </div>
      );
  }
}

  export default TrackingNew;