import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Tracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      userName: props.location.username,
      userData: {},
      trackingArray: [],
      habit_0: false,
      habit_1: false,
      habit_2: false,
      habit_3: false,
      habit_4: false,
      habit_5: false,
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
    event.preventDefault();
    //do we need this...?
      const {name, value, type, checked} = event.target
      // type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({ [name]: value })
      this.setState({ [name]: checked })
      console.log(this.state)
  }

  checkHabit = (habitIndex) => {
    //put request to push false or true to habit tracking array
    axios.put(`/habits/update-habit/${this.state.userName}/${habitIndex}`)
    .then(response => console.log(response))
    .catch(error => {
      console.log("this is error", error.message);
    });
    console.log(`This is habit index:${habitIndex}`)
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
          name={`habit_${index}`}
          checked={`habit_${index}`}
          onChange={(habitIndex) => {
            this.checkHabit(index)
          }}
          ></input>
        </form>
        {`this.state.habit_${index}` ? 'Habit Done!' : 'Habit NOT done :((('}
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