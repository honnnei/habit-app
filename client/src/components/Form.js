import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';


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
          <div className='container formDiv'>
        
            <div className='formsub justify-content-center ml-auto '>
              <div className="form1">
                <form>
                    <h3>Sign Up!</h3>
                    <label className="ulabel">Create Username</label>
                        <input 
                        name="newUsername" 
                        type="text"
                        value={this.state.newUsername}
                        onChange={this.handleChange}
                        ></input>
                </form>
                <Link to={{pathname:'/newUser', username : this.state.newUsername}}><button className='createUserButton' type='submit' onClick={this.validateNewUser}>Create User</button></Link>
             </div>
            <div className='form2'>
                <form>
                <h3>Log In</h3>
                <label className="ulabel">Enter Username</label>
                    <input 
                    name="existingUsername" 
                    type="text"
                    value={this.state.existingUsername}
                    onChange={this.handleChange}
                    ></input>
                </form>
                <Link to={{pathname:'/tracker', username : this.state.existingUsername}}><button className="logInButton" type='submit' onClick={this.validateExistingUser}>Log In</button></Link>
            </div>
            </div>
        </div>  
      
    );
  }
   
}

export default Form;
