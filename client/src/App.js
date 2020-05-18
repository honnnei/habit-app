import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Form from './component/Form';
import TrackingNew from './containers/TrackingNew';
import TrackingExisting from './containers/TrackingExisting';

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
          <div className="App">
            <Router>
        <Switch>
            <Route 
                path='/'
                exact 
                component={Form}
            />
            <Route 
                path='/tracking-new-user'
                exact 
                component={TrackingNew}

            />
            <Route
                path='/tracking-user'
                exact 
                component={TrackingExisting}
            />
        </Switch>
        </Router>
        </div>
      
    );
  }
   
}

export default App;
