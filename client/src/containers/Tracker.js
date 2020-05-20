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
      do_we_need_this: false
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
    });
    
  }

  componentDidMount() {
  this.getUserHabits();
  }

  handleChange = (event, habitIndex, trackIndex) => {
      // event.preventDefault();
      // const {name, value, type, checked} = event.target
      // this.setState({ [name]: checked })
    axios.put(`/habits/update-habit/${this.state.userName}/${habitIndex}`)
    .then(response => response)
    .catch(error => {
      console.log("this is error", error.message);
    });
    this.getUserHabits();
  }
 

  mapHabitArray = () => {
    let habitArray = []
    let trackArray = []
    if (this.state.userData.habit) {
      habitArray = this.state.userData.habit.map((habit, index) => (
        <div>
        <h1>{habit.habitName}</h1>
        <h3>You've set out to do this {habit.tracking.length} each day! Check as you go:</h3>
        
        {trackArray = habit.tracking.map((trackValue, trackIndex) => (
            <div className="habit-track-input">
              <h3>{habit.tracking.length}</h3>
              <form>
              <input
              id={index}
              type="checkbox"
              name={this.state.do_we_need_this}
              checked={trackValue}
              onChange={event => this.handleChange(event, trackIndex, index)}
              ></input>
            </form>
          </div>
        ))}
        <div className="habit-tracking-array">
        </div>
        </div>
      )) 
    }
    return habitArray;
    console.log(habitArray);
  }
  
  render() {
    console.log(this.state)
      return(
        <React.Fragment>
        {
        this.state.userName ?
        <div className="trackerDiv">
            <h1>{this.state.userName}</h1>
            <Link to={{pathname:'/habit/add', username:this.state.userName}}>Create Habit</Link>
            {this.mapHabitArray()}
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

export default Tracker;