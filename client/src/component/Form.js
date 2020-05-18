import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import TrackingNew from '../containers/TrackingNew';
import TrackingExisting from '../containers/TrackingExisting';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      newUsername: "",
      existingUsername: ""
    })
  }

  handleChange = (event) => {
      event.preventDefault();
    const {name, value} = event.target
    this.setState({ [name]: value })
  }
  

  render() {
    return (
          <div className="App">
        <form>
          <h3>Sign Up!</h3>
        <label>Your Username:</label>
            <input 
            name="newUsername" 
            type="text"
            value={this.state.newUsername}
            onChange={this.handleChange}
            ></input>
        </form>
        <Link to='/tracking-new-user'><button type='submit'>Create User</button></Link>
        <form>
        <h3>Log In:</h3>
        <label>Your Username:</label>
            <input 
            name="existingUsername" 
            type="text"
            value={this.state.existingUsername}
            onChange={this.handleChange}
            ></input>
        </form>
        <Link to='/tracking-user'><button type='submit'>Log In</button></Link>
        </div>
      
    );
  }
   
}

export default Form;
