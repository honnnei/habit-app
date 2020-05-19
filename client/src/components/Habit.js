import React from 'react';
import { Link } from 'react-router-dom';
import axios from "axios"

class Habit extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      nameOfUser: props.location.username,
      habitName: "",
      frequency: 0,
      tracking: []
      /* action: '' */
    })
  }

  createHabit = () => {
    console.log(this.state.nameOfUser);
    if (this.state.nameOfUser) {
      axios.put(`habits/add-habit/${this.state.nameOfUser}`, {
        habitName: this.state.habitName,
        frequency: this.state.frequency,
        date: new Date().toISOString().split('T')[0],
        tracking: this.state.tracking
      })
      .then(response => console.log(response))
      .catch(error => {
        console.log("this is error", error.message);
      });
    }
  }

  handleChange = (event) => {
    event.preventDefault();
    const {name, value} = event.target
    this.setState({ [name]: value })
  }


  render() {
      return (
        <div className="habit-container">
            <form>
                <h3>Create Habit</h3>
                <label htmlFor="habitName">What habit would you like to track?</label>
                    <input
                    id="habitName" 
                    name="habitName" 
                    type="text"
                    value={this.state.habitName}
                    onChange={this.handleChange}
                    ></input>
                <label htmlFor="frequency">How many times per day are you looking to do this?</label>
                <input
                    id="frequency" 
                    name="frequency" 
                    type="number"
                    value={this.state.frequency}
                    onChange={this.handleChange}
                    ></input>
                  {/* <label>Action</label>
                    <input 
                    name="action" 
                    type="text"
                    value={this.state.action}
                    onChange={this.handleChange}
                    ></input> */}
            </form>
            <div>
              <Link to={{pathname:'/tracker', username: this.state.nameOfUser}}><button onClick={this.createHabit}>Add</button></Link>
            </div>
          </div>  
      );
  }
}

export default Habit;