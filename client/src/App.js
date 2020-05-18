import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Form from './components/Form';
import NewUser from './containers/NewUser';
import Tracker from './containers/Tracker';
import Habit from './components/Habit';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      newUsername: "",
      existingUsername: ""
    })
  }

  render() {
    return (
          <div className="Home">
            <Router>
              <Switch>
                  <Route 
                      path='/'
                      exact 
                      component={Form}
                  />
                  <Route 
                      path='/newUser'
                      exact 
                      component={NewUser}

                  />
                  <Route
                      path='/tracker'
                      exact 
                      component={Tracker}
                  />
                  <Route
                      path='/habit/add'
                      exact 
                      component={Habit}
                  />
               </Switch>
            </Router>
        </div>
    );
  }
}

export default App;
