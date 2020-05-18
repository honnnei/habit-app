import React from 'react';

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
        <form onSubmit={this.createUser}>
          <h3>Sign Up!</h3>
        <label>Your Username:</label>
            <input 
            name="newUsername" 
            type="text"
            value={this.state.newUsername}
            onChange={this.handleChange}
            ></input>
        <button>Create User</button>
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
        <button>Log In</button>
        </form>
      </div>
    );
  }
   
}

export default App;
