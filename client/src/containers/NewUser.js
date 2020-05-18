import React from 'react';
import { Link } from 'react-router-dom';

class NewUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      username: props.location.username
    })
  }

  render() {
      return(
        <div className="new-user">
              <h1>New Account</h1>
              <h3>USER SUCCESSFULLY CREATED</h3>
              <h2>Hello, {this.state.username}</h2>
              <p>Are you ready to track your Habits? </p>
                <div>
                  <Link to='/tracker'><button type='submit'>Yes</button></Link>
                  <Link to='/'><button type='submit'>No</button></Link>
                </div> 
        </div>
      );
  }
}

export default NewUser;