import React from 'react';
import { Link } from 'react-router-dom';

class Habit extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      nameOfUser: props.location.username,
      habitName: '',
      action: ''
    })
  }

  createHabit = () => {
    console.log('I am hulk');
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
                <label>Habit</label>
                    <input 
                    name="habitName" 
                    type="text"
                    value={this.state.habitName}
                    onChange={this.handleChange}
                    ></input>
                  <label>Action</label>
                    <input 
                    name="action" 
                    type="text"
                    value={this.state.action}
                    onChange={this.handleChange}
                    ></input>
            </form>
            <div>
              <Link to='/tracker' onClick={this.createHabit}>Add</Link>
            </div>
          </div>  
      );
  }
}

export default Habit;