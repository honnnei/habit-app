import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Tracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      userName: props.location.username,
      userData: {},
      trackingArray: []
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

  handleChange = (event) => {
    //do we need this...?
      const {name, value, type, checked} = event.target
      // type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({ [name]: value })
      this.setState({ [name]: checked })
      console.log(this.state)
  }

  chackHabit = () => {
    //put request to push false or true to habit tracking array
  }

  mapHabitArray = () => {
    let habitArray = []
    if (this.state.userData.habit) {
      habitArray = this.state.userData.habit.map((habit, index) => (
        <div>
        <h1>{habit.habitName}</h1>
        <h1>{index}</h1>
        <form>
          <input
          id={index}
          type="checkbox"
          name={`${index}`}
          checked={this.state.userData.habit[index].tracking[this.state.userData.habit[index].tracking - 1]}
          onChange={this.checkHabit}
          ></input>
        </form>
        {`this.state.${index}` ? 'Habit Done!' : 'Habit NOT done :((('}
        </div>
        
      )) 
    }
    return habitArray;
  }
  
  render() {
    console.log(this.state.tracked)
      return(
        <div className="trackerDiv">
            <h1>{this.state.userName}</h1>
            <Link to={{pathname:'/habit/add', username:this.state.userName}}>Create Habit</Link>
            {this.mapHabitArray()}
        </div>
      );
  }
}

export default Tracker;