import React from 'react';
import { Link } from 'react-router-dom';

class Habit extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      username: props.location.username
    })
  }

  render() {
      return (
        <div>
            <h1>Habit Add</h1>
          </div>  
      );
  }
}

export default Habit;