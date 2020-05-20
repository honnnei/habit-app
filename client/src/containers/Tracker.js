import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProgressBar from 'react-bootstrap/ProgressBar';

// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';



// const ModalExample = (props) => {
//   const {
//     buttonLabel,
//     className
//   } = props;

//   const [modal, setModal] = useState(false);

//   const toggle = () => setModal(!modal);

//   return (
//     <div>
//       <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
//       <Modal isOpen={modal} toggle={toggle} className={className}>
//         <ModalHeader toggle={toggle}>Modal title</ModalHeader>
//         <ModalBody>
//           Hi there
//         </ModalBody>
//         <ModalFooter>
//           <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
//           <Button color="secondary" onClick={toggle}>Cancel</Button>
//         </ModalFooter>
//       </Modal>
//     </div>
//   );
// }




const Tracker = (props) => {
  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState();
  const [progress, setProgress] = useState(0);

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
      <div>
       <h1> {habit.habitName} </h1>
       <ProgressBar now={habitProgressBar(habit.frequency, habit.tracking)} label={habitProgressBar(habit.frequency, habit.tracking)} variant="success" />
       <h3>You've set out to do this {habit.tracking.length} each day! Check as you go:</h3>
        {trackArray = habit.tracking.map((trackValue, trackIndex) => ( 
          <div className = "habit-track-input" >
            <h3> {habit.tracking.length} </h3> 
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
      <div className="trackerDiv">
        <ProgressBar now={progressBar()} label = {progressBar()} variant = "success" />
        <h1> {progress}</h1> 
        <h1> {userName}</h1>
        <Link to={{pathname: '/habit/add', username: userName}}>Create Habit</Link> 
        {mapHabitArray()}
        <ModalExample />
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