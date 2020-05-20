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

  handleChange = (event, habitIndex) => {
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
    if (this.state.userData.habit) {
      habitArray = this.state.userData.habit.map((habit, index) => (
        <div>
          {/* <h3>tracking array is{JSON.stringify(habit.tracking.length)}</h3> */}
        <h1>{habit.habitName}</h1>
        <h1>{index}</h1>
        <form>
          <input
          id={index}
          type="checkbox"
          name={this.state.do_we_need_this}
          checked={habit.tracking[habit.tracking.length - 1]}
          onChange={event => this.handleChange(event, index)}
          ></input>
        </form>
        {`this.state.habit_${index}` ? 'Habit Done!' : 'Habit NOT done :((('}
        </div>
        
      )) 
    }
    return habitArray;
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