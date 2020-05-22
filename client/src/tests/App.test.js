import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import { shallow, mount } from 'enzyme';
import { Route } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Tracker from '../containers/Tracker';
import NewUser from '../containers/NewUser';
import Form from '../components/Form';

describe('App', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  // it('matches the snapshot', () => {
  //   const tree = renderer.create(<App />).toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  // test('renders Navbar', () => {
  //   expect(wrapper.containsMatchingElement(<Navbar />)).toEqual(true);
  // });

  test('contains Routes', () => {
    expect(wrapper.containsMatchingElement(<Route />)).toEqual(true);
  });

  test('contains 4 Routes', () => {
    console.log(wrapper.debug());
    expect((wrapper.find('Route').length)).toEqual(3);
  });

   test('Route to HomePage is exact', () => {     
    let wrap = mount(<App />);                                 
    let route = wrap.find(<Route path='/' exact component={Form}/>);
    expect(route).toBeTruthy();
   });

   test('Route to NewUser is exact', () => {   
    let wrap = mount(<App />);                                       
    let route = wrap.find( <Route path='/newUser' exact component={NewUser}/>);
    expect(route).toBeTruthy();
   });

  test('Route to Habit Tracker Add is exact', () => {   
    let wrap = mount(<App />);                                       
    let route = wrap.find( <Route
      path='/tracker'
      exact 
      component={Tracker}
  />);
    expect(route).toBeTruthy();
  });

    
});

