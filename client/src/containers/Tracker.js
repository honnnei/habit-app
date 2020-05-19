import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Tracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      username: props.location.username,
      userData: {
        "id": 1,
        "name": "Steven",
        "habit": [
          {
            "id": 0,
            "name": "Water",
            "date": "2020-05-18",
            "frequency": 1,
            "tracking": [
              false,
              true,
              false,
              true
            ]
          },
          {
            "id": 1,
            "name": "Exercise",
            "date": "2020-05-18",
            "frequency": 1,
            "tracking": [
              false,
              true,
              false,
              true
            ]
          }
        ]
      }
    })
  }

  getUserHabits = () => {
    axios('/users/name/:id')
    .then(response => response.data)
    .then(array => {
      this.setState({
            userData: array,
            loading:false
          });
    })
  }

  componentDidMount(){
  
  }

  render() {
      return(
        <div className="trackerDiv">
            <h1>{this.state.username}</h1>
            {this.state.userData.habit.map(habit => (
              <h1>{habit.name} is {habit.tracking[habit.tracking.length - 1] ? 'Done' : 'Not Done' }</h1> 
            ))}
            <Link to='/habit/add'>Create Habit</Link>
        </div>
      );
  }
}

export default Tracker;