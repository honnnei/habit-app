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
            <Link to={{pathname:'/newUser', username : this.state.newUsername}}><button type='submit'>Create User</button></Link>
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
                <Link to={{pathname:'/tracker', username : this.state.existingUsername}}><button type='submit'>Log In</button></Link>
            </div>
        </div>  
      
    );
  }
   
}

export default Form;
