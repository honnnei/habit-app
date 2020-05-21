import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ProgressBar } from 'react-bootstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import NavLog from '../components/NavLog'


const Tracker = (props) => {
  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState({});
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
          .then(
            getUserHabits(),
          )
          .then(
            toggle()
          )
          .catch(error => {
            console.log("this is error", error.message);
          })
        }
      }

      useEffect(() => {
        console.log("this is habit frequency: ", habitFrequency);
      }, [habitFrequency]);

      useEffect(() => {
        console.log("this is habit name: ", habitName);
      }, [habitName]);


  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  function getUserHabits() {
    console.log("get user habits runs")
    axios(`/habits/${userName}`)
      .then(response => response.data)
      .then(array => {
        setUserData(array)
      })
  }
  useEffect(() => {
    console.log("userdata: ", userData);
  }, [userData]);

   useEffect(() => {
    setUserName(props.location.username);
  }); // what does this do?

  useEffect(() => {
    getUserHabits();
  }, [userName]); // this too?

  const updateHabitTracking = (event, habitIndex, trackIndex, trackValue) => {
    console.log('updatehabittracking');
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

  const deleteHabit = (event, habitID) => {
    event.preventDefault()
    console.log("this is delete" + habitID)
    axios.put(`habits/delete-habit/${userName}/${habitID}`)
    .then(
      getUserHabits()
      // toggle()
    )
  }



  const mapHabitArray = () => {
    console.log(userData)
    let habitArray = []
    let trackArray = []
    let colorArray = ['dark', 'info', 'warning', 'primary'];

    function habitProgressBar(habitFrequency, trackArray) {
      let habitProgress = 0;
      habitProgress = Math.floor((trackArray.filter(Boolean).length / habitFrequency) * 100);
      return habitProgress;
    }

    if ((userData) && (userData.habit)) {
      habitArray = userData.habit.map((habit, habitIndex) => ( 

      <div className="habitDiv" key = {habitIndex}>
        <div className="habitHeader">
          <div className="habitNameClass"><h5> {habit.habitName} </h5></div>
       <div className="subProgress">
       <ProgressBar now={habitProgressBar(habit.frequency, habit.tracking)} label={habitProgressBar(habit.frequency, habit.tracking)} variant="dark" />
       </div>
       </div>
       <div className="trackingMap container-fluid">
       {/* <p>You've set out to do this {habit.tracking.length} each day! Check as you go:</p> */}
        {trackArray = habit.tracking.map((trackValue, trackIndex) => ( 
          <div className = "habit-track-input " key={trackIndex}>
            {/* <h3> {habit.tracking.length} </h3>  */}
            <div className = "habit-track-input" key={trackIndex}>
                  <form>
                      <input
                      id = {trackIndex}
                      className="trackCheckBox"
                      type = "checkbox"
                      name = "habit_track_check"
                      checked = {trackValue}
                      onChange = {event => updateHabitTracking(event, habitIndex, trackIndex, trackValue)}>
                      </input> 
                  </form> 
            </div>
          </div>
                ))}
                </div> 
              <button type="button" className="deleteButton" onClick={event => deleteHabit(event, habitIndex)}>Delete</button>
          </div>
      ))}
      else{
        habitArray = []

      }
    return habitArray;
  }

  return ( 
    <React.Fragment >
      {
      userName ?
      <div className="container trackerDiv">
         <NavLog />
        <div className="container progessDiv">
          <h3> Hey! {userName}</h3>
          <p>You've set out some Habits to track. Don't forget to mark it when you're done.</p>
          <h5>Here's your daily progress</h5>
          <ProgressBar now={progressBar()} label = {progressBar()} variant = "warning"></ProgressBar>
        </div>
        {/* <h1> {progress}</h1>  */}
        <div className="habit-modal">
          <Button className="AddHabitButton" onClick={toggle} id="add-habit"> Create </Button>
          <Modal isOpen={modal} toggle={toggle}> 
            <ModalHeader toggle={toggle}>What shall we do today?</ModalHeader>
            <ModalBody>
            <div className="habit-container">
                <form>
                    <h3>Create Habit</h3>
                    <label id="label-in-modal" htmlFor="habitName">What habit would you like to track?</label>
                        <input
                        id="habitName" 
                        name="habitName" 
                        type="text"
                        value={habitName}
                        onChange={handleName}
                        ></input>
                    <label htmlFor="frequency">How many times per day are you looking to do this?</label>
                    <input
                        className="freqBtn"
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
              <Button className="modalBtn" onClick={() => {toggle(); createHabit();}}>Create</Button>
              <Button className="modalBtn2" onClick={toggle} id="cancel" >Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
        {mapHabitArray()}
      </div>
      :
        <div className="BackDiv">
        <div className="pleaseLogin">
          <h3>Please login to continue</h3>
          <Link to="/">
            <button type="button" className="BackButton">Go Back</button>
          </Link>
        </div>
      </div>
    } 
    </React.Fragment>
  );
}

export default Tracker;

{/* //from merge from dev:
      <div key = {habitIndex}>
        <h1> {habit.habitName} </h1>
        <ProgressBar now={habitProgressBar(habit.frequency, habit.tracking)} label={habitProgressBar(habit.frequency, habit.tracking)} variant="success" />
        <h3>You've set out to do this {habit.tracking.length} each day! Check as you go:</h3>
         {trackArray = habit.tracking.map((trackValue, trackIndex) => (  */}