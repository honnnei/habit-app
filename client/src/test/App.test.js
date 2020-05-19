import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import { shallow, mount } from 'enzyme';
import { Route } from 'react-router-dom';

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
    expect((wrapper.find('Route').length)).toEqual(4);
  });

   test('Route to HomePage is exact', () => {     
    let wrap = mount(<App />);                                 
    let route = wrap.find(<Route path='/' exact/>);
    expect(route).toBeTruthy();
   });

   test('Route to NewUser is exact', () => {   
    let wrap = mount(<App />);                                       
    let route = wrap.find( <Route path='/newUser' exact/>);
    expect(route).toBeTruthy();
   });

   test('Route to Tracker is exact', () => {   
    let wrap = mount(<App />);                                       
    let route = wrap.find( <Route path='/tracker' exact/>);
    expect(route).toBeTruthy();
   });

   test('Route to Habit Tracker Add is exact', () => {   
      let wrap = mount(<App />);                                       
      let route = wrap.find( <Route path='/habit/add' exact/>);
      expect(route).toBeTruthy();
    });
});

