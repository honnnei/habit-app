import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Tracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      userName: props.location.username,
      userData: {}
    })
  }

  getUserHabits = () => {
    axios(`/habits/${this.state.userName}`)
    .then(response => response.data)
    .then(array => {
      this.setState({
            userData: array,
            loading:false
          });
      console.log(this.state.userData)
      console.log(this.state.userData.habit)
    })
  }

  componentDidMount() {
  this.getUserHabits();
  }

  
  render() {

    let habitArray = []
    if (this.state.userData.habit) {
      habitArray = this.state.userData.habit.map(habit => (
        <h1>{habit.habitName}</h1> 
      )) 
    }
    // {habit.tracking[habit.tracking.length - 1] ? 'Done' : 'Not Done' 
    console.log(this.state.userData.habit)
      return(
        <div className="trackerDiv">
            <h1>{this.state.userName}</h1>
           {habitArray}
            <Link to={{pathname:'/habit/add', username:this.state.userName}}>Create Habit</Link>
        </div>
      );
  }
}

export default Tracker;