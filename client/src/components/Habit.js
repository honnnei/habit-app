import React from 'react';
import { Link } from 'react-router-dom';
import axios from "axios"
import { useState, useEffect } from 'react';


// class Habit extends React.Component {
  const Habit = (props) => {
  const [ habitFrequency, setHabitFrequency ] = useState(0);
  const [ habitName, setHabitName ] = useState("");
  const [ trackingArray, setTrackingArray ] = useState([]);

  const handleName = e => {
    e.persist();
    setHabitName(e.target.value);
  };

  const handleFrequency = e => {
    e.persist();
    setHabitFrequency(e.target.value);
    // updateTrackingByFrequency();
    // let array = ['one', 'two', 'three']
   let array = [];
    for ( let i = 0; i < e.target.value; i++ ) {
      array.push(false);
    }
    setTrackingArray(array);
  }

  const createHabit = () => {
    if (props.location.username) {
      axios.put(`habits/add-habit/${props.location.username}`, {
        habitName: habitName,
        frequency: habitFrequency,
        date: new Date().toISOString().split('T')[0],
        tracking: trackingArray
      })
      .then(response => console.log(response))
      .catch(error => {
        console.log("this is error", error.message);
      });
    }
  }

  const updateTrackingByFrequency = () => {
    // console.log(`handle change 4 ${this.state.habitFrequency}`)
    // console.log('this is update trackin');
    let array = ['one', 'two', 'three']
    // console.log(`this is habit fre from updatetracking: ${habitFrequency}`)
    // for (let i=0; i < habitFrequency; i++) {
    //   array.push('we pushed it')
    // }
    // console.log(array);
    // setTrackingArray(array);
    // console.log(trackingArray);
  }


  useEffect(() => {
    console.log("this is habit freaquency: ", habitFrequency);
  }, [habitFrequency]);

  useEffect(() => {
    console.log("this is habit name: ", habitName);
  }, [habitName]);

  // useEffect(() => {
  //   updateTrackingByFrequency();
  // }, [habitFrequency]);

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

  // const [ nameOfUser, setNameOfUSer ] = useState

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
                    <input
                    id="habitName" 
                    name="habitName" 
                    type="text"
                    value={habitName}
                    onChange={handleName}
                    ></input>
                <label htmlFor="frequency">How many times per day are you looking to do this?</label>
                <input
                    id="rrequency" 
                    name="habitFrequency" 
                    min="1"
                    max="10"
                    type="number"
                    value={habitFrequency}
                    onChange={handleFrequency}
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
              <Link to={{pathname:'/tracker', username: props.location.username}}><button onClick={createHabit}>Add</button></Link>
            </div>
          </div>  
      );
  // }
}

export default Habit;