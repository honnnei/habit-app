import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

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
            <h1>New Account</h1>
            <h4>USER SUCCESSFULLY CREATED</h4>
            <h3>Hello, {this.state.username}</h3>
            <p>Are you ready to track your Habits? </p>
              <div>
              <Link to='/tracking-user'><button type='submit'>Ready</button></Link>
              </div>
        </div>
      );
  }
}

export default TrackingNew;