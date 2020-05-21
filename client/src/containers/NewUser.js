import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

class NewUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      userName: props.location.username
    })
  }

createUser = () => {
  Axios.post('/habits/add-user', {
    username : this.state.userName
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
        <div className="new-user">
              <h1>New Account</h1>
              <h3>USER SUCCESSFULLY CREATED</h3>
              <h2>Hello, {this.state.userName}</h2>
              <p>Are you ready to track your Habits? </p>
                <div>
                  <Link to={{pathname:'/tracker', username:this.state.userName}}><button type='submit' >Yes</button></Link>
                  <Link to='/'><button type='submit'>No</button></Link>
                </div> 
        </div>
        :
        <div>
        <h3>Please login to continue</h3>
        <Link to="/"><button type="button">Go Back</button></Link>
        </div>
      }
        </React.Fragment>
      );
  }
}

export default NewUser;