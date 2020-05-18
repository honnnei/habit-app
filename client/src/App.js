import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import TrackingNew from './containers/TrackingNew';
import TrackingExisting from './containers/TrackingExisting';

class App extends React.Component {
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

  logIn = (event) => {
    event.preventDefault();
  //get existing user
  // axios(`/users/${this.state.username}`)
  // .then(response => console.log(response.data))
  // .catch(error => {
  //   console.log("this is error", error.message);
  // });
  console.log('You\'re logged in' + this.state.existingUsername);
  }

  createUser = (event) => {
    event.preventDefault();
    //post new user
    // axios.post('/users/add', {
    //   username: this.state.username
    // })
    // .then(response => console.log(response.data))
    // .catch(error => {
    //   console.log("this is error", error.message);
    // });
    console.log('User created:' + this.state.newUsername)
  }


  render() {
    return (
          <div className="App">
            <Router>
        <form onSubmit={this.createUser}>
          <h3>Sign Up!</h3>
        <label>Your Username:</label>
            <input 
            name="newUsername" 
            type="text"
            value={this.state.newUsername}
            onChange={this.handleChange}
            ></input>
        <Link to="/tracking-new-user">><button>Create User</button></Link>
        </form>
        <form onSubmit={this.logIn}>
        <h3>Log In:</h3>
        <label>Your Username:</label>
            <input 
            name="existingUsername" 
            type="text"
            value={this.state.existingUsername}
            onChange={this.handleChange}
            ></input>
        <Link to="/tracking-user"></Link><button>Log In</button>
        </form>
        <Switch>
            <Route 
                path='/tracking-new-user'
                exact 
                render={(props) => <TrackingNew {...props} userName={this.state.newUsername} />} 
            />
            <Route
                path='/tracking-user'
                exact 
                render={(props) => <TrackingExisting {...props} userName={this.state.existingUsername} />} 
            />
        </Switch>
        {/* <TrackingExisting />
        <TrackingNew /> */}
        </Router>
        </div>
      
    );
  }
   
}

export default App;
