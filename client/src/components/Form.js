import React from 'react';
import { Link } from 'react-router-dom';

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
  
  validateNewUser = (event) =>{
    if(!this.state.newUsername){
      event.preventDefault();
      alert('Please enter valid Username')
    }
  }

  validateExistingUser = (event) =>{
    if(!this.state.existingUsername){
      event.preventDefault();
      alert('Please enter valid Username')
    }
  }

  render() {
    return (
          <div className="FormContainer">
            <div>
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
            <Link to={{pathname:'/newUser', username : this.state.newUsername}}><button type='submit' onClick={this.validateNewUser}>Create User</button></Link>
            </div>

            <div>
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
                <Link to={{pathname:'/tracker', username : this.state.existingUsername}}><button type='submit' onClick={this.validateExistingUser}>Log In</button></Link>
            </div>
        </div>  
      
    );
  }
   
}

export default Form;
