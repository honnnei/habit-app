import React from 'react';
import { Link } from 'react-router-dom';
import axios from "axios"
import { useState, useEffect } from 'react';


// class Habit extends React.Component {
  const Habit = () => {
  const [ Frequency, setFrequency ] = useState("");
  const onChange = e => {
    e.persist();
    setFrequency(e.target.value);
  };
  useEffect(() => {
    console.log("Search message inside useEffect: ", Frequency);
  }, [Frequency]);

  // constructor(props) {
  //   super(props);
  //   this.state = ({
  //     nameOfUser: props.location.username,
  //     habitName: "",
  //     frequency: undefined,
  //     trackingArray: []

  //     /* action: '' */
  //   })
  // }

  // createHabit = () => {
  //   console.log(this.state.nameOfUser);
  //   if (this.state.nameOfUser) {
  //     axios.put(`habits/add-habit/${this.state.nameOfUser}`, {
  //       habitName: this.state.habitName,
  //       frequency: this.state.frequency,
  //       date: new Date().toISOString().split('T')[0],
  //       tracking: this.state.trackingArray
  //     })
  //     .then(response => console.log(response))
  //     .catch(error => {
  //       console.log("this is error", error.message);
  //     });
  //   }
  // }

  // updateTrackingByFrequency = () => {
  //   console.log(`handle change 4 ${this.state.frequency}`)
  //   console.log('this is update trackin');
  //   let array = []
  //   for (let i=0; i < this.state.frequency; i++) {
  //     array.push('we pushed it')
  //   }
  //   console.log(array);
  //   this.setState({
  //     trackingArray: array
  //   })
  // }

  // handleChange = (event) => {
  //   console.log(`handle change 1 ${this.state.frequency}`)
  //   event.preventDefault();
  //   const {name, value} = event.target
  //   this.setState({ [name]: value })
  //   console.log(`handle change 2 ${this.state.frequency}`)
  //   if (this.state.frequency) {
  //     console.log(`handle change 3 ${this.state.frequency}`)
  //     this.updateTrackingByFrequency()
  //   }
  // }


  // render() {
      return (
        <div className="habit-container">
            <form>
                <h3>Create Habit</h3>
                <label htmlFor="habitName">What habit would you like to track?</label>
                    {/* <input
                    id="habitName" 
                    name="habitName" 
                    type="text"
                    value={this.state.habitName}
                    onChange={this.handleChange}
                    ></input> */}
                <label htmlFor="frequency">How many times per day are you looking to do this?</label>
                <input
                    id="rrequency" 
                    name="Frequency" 
                    type="number"
                    value={Frequency}
                    onChange={onChange}
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
              {/* <Link to={{pathname:'/tracker', username: this.state.nameOfUser}}><button onClick={this.createHabit}>Add</button></Link> */}
            </div>
          </div>  
      );
  // }
}

export default Habit;