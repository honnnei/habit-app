import React from 'react';
import { BrowserRouter as Router, Link, Switch } from 'react';

class TrackingExisting extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      username: "hi"
    })
  }

  render() {
      return(
        <div>
            <h1>{this.state.username}</h1>
            <h1>TrackingExisting</h1>
        </div>
      );
  }
}

  export default TrackingExisting;