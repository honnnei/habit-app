import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import { ProgressBar } from 'react-bootstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';



const Tracker = (props) => {
  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState();
  const [progress, setProgress] = useState(0);
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
        if (userName) {
          axios.put(`habits/add-habit/${userName}`, {
            habitName: habitName,
            frequency: habitFrequency,
            date: new Date().toISOString().split('T')[0],
            tracking: trackingArray
          })
          .then(response => response)
          .catch(error => {
            console.log("this is error", error.message);
          });
          getUserHabits();
          toggle();
        }
      }

      useEffect(() => {
        console.log("this is habit frequency: ", habitFrequency);
      }, [habitFrequency]);

      useEffect(() => {
        console.log("this is habit name: ", habitName);
      }, [habitName]);

  // const {
  //   buttonLabel,
  //   className
  // } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const getUserHabits = () => {
    axios(`/habits/${userName}`)
      .then(response => response.data)
      .then(array => {
        setUserData(array)
      });
  }

  useEffect(() => {
    setUserName(props.location.username);
    getUserHabits();
  }, []);

  useEffect(() => {
    getUserHabits();
  }, [userName]);

  const updateHabitTracking = (event, habitIndex, trackIndex, trackValue) => {
    let updatedTrackValue;
    trackValue ? updatedTrackValue = false : updatedTrackValue = true;
    axios.put(`/habits/update-habit/${userName}/${habitIndex}/${trackIndex}/${updatedTrackValue}`)
      .then(response => response)
      .catch(error => {
        console.log("this is error", error.message);
      });
    getUserHabits();
  }

  const progressBar = () => {
    let maximumTrackNumber = 0;
    let dailyProgress = 0;
    let dailyProgressPercentage = 0;

    if ((userData) && (userData.habit)) {
      for (let i = 0; i < userData.habit.length; i++) {
        maximumTrackNumber += userData.habit[i].tracking.length;
        dailyProgress += userData.habit[i].tracking.filter(Boolean).length;
      }
      dailyProgressPercentage = Math.floor((dailyProgress / maximumTrackNumber) * 100);
      return dailyProgressPercentage;
    }
  }



  const mapHabitArray = () => {
    let habitArray = []
    let trackArray = []

    function habitProgressBar(habitFrequency, trackArray) {
      let habitProgress = 0;
      habitProgress = Math.floor((trackArray.filter(Boolean).length / habitFrequency) * 100);
      return habitProgress;
    }

    if ((userData) && (userData.habit)) {

      habitArray = userData.habit.map((habit, habitIndex) => ( 
      <div className="habitsDiv">
       <h5> {habit.habitName} </h5>
       <div className="subProgress">
       {/* <ProgressBar now={habitProgressBar(habit.frequency, habit.tracking)} label={habitProgressBar(habit.frequency, habit.tracking)} variant="success" /> */}
       </div>
       {/* <p>You've set out to do this {habit.tracking.length} each day! Check as you go:</p> */}
        {trackArray = habit.tracking.map((trackValue, trackIndex) => ( 
          <div className = "habit-track-input " >
            {/* <h3> {habit.tracking.length} </h3>  */}
            <form >
            <input
            id = {trackIndex}
            type = "checkbox"
            name = "habit_track_check"
            checked = {trackValue}
            onChange = {
              event => updateHabitTracking(event, habitIndex, trackIndex, trackValue)}>
            </input> 
            </form> 
            </div>
            ))} 
          
          </div>
      ))}
    return habitArray;
  }

  return ( 
    <React.Fragment > 
      {
      userName ?
      <div className="container trackerDiv">
        <div className="container progessDiv">
          <h3> Hey! {userName}</h3>
          <p>You've set out some Habits to track. Don't forget to mark it when done.</p>
          <h5>Here's your daily progress</h5>
          {/* <ProgressBar now={progressBar()} label = {progressBar()} variant = "success"></ProgressBar> */}
        </div>
        {/* <h1> {progress}</h1>  */}
        <div className="habit-modal">
          <Button color="danger" onClick={toggle}>+</Button>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>What shall we do today?</ModalHeader>
            <ModalBody>
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
                  </form>
                </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => {toggle(); createHabit();}}>Create</Button>
              <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
        {mapHabitArray()}
      </div>
      :
        <div>
          <h3>Please login to continue</h3> <Link to="/"><button type="button">Go Back</button></Link >
        </div>
    } 
    </React.Fragment>
  );
}

export default Tracker;