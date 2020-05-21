import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Form from './components/Form';
import NewUser from './containers/NewUser';
import Tracker from './containers/Tracker';

const App = () => {
  
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
               </Switch>
            </Router>
        </div>
    );
}

export default App;
