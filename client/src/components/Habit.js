import React from 'react';
import { Link } from 'react-router-dom';
import axios from "axios"
import { useState, useEffect } from 'react';



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
          .then(response => response)
          .catch(error => {
            console.log("this is error", error.message);
          });
        }
      }

      useEffect(() => {
        console.log("this is habit freaquency: ", habitFrequency);
      }, [habitFrequency]);

      useEffect(() => {
        console.log("this is habit name: ", habitName);
      }, [habitName]);

          return (
            <React.Fragment>
            {
              props.location.username ?
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
              :
              <div>
                <h3>Please login to continue</h3>
                <Link to="/"><button type="button">Go Back</button></Link>
              </div>
              
            }
            </React.Fragment>
          );
      }
          

export default Habit;