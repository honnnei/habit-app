import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Nav from '../components/Nav';

class NewUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      userName: props.location.username
    })
  }

createUser = () => {
  Axios.post('/habits/add-user', {
    username : this.props.location.username
  }).then(response => console.log(response))
  .catch(error => {
    console.log("this is error", error.message);
  });
}

componentDidMount(){
  this.createUser();
}

  render() {
      return(
        <React.Fragment>
        {this.state.userName ? 
        <div className="container new-user-outer-container">
          <Nav />
          <div className="container new-user-container">
            <div className="new-user">
                  <h1>Hello, {this.state.userName},</h1>
                  <h2>Your Account was successfully created.</h2>
                  <h1>Are you ready to track your Habits? </h1>
                    <div className="new-user-links-container">
                      <Link to={{pathname:'/tracker', username:this.state.userName}}><button type='submit' className="createUserButton">Yes</button></Link>
                      <Link to='/'><button type='submit' className="logInButton">Log Out</button></Link>
                    </div> 
            </div>
          </div>
        </div>
        :
        <div className="BackDiv">
          <div className="pleaseLogin">
            <h3>Please login to continue</h3>
            <Link to="/">
              <button type="button" className="BackButton">Go Back</button>
            </Link>
          </div>
        </div>
      }
        </React.Fragment>
      );
  }
}

export default NewUser;