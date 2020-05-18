import React from 'react';
import { render } from '@testing-library/react';
import NewUser from '../containers/NewUser';
import { shallow, mount } from 'enzyme';
import { Link, BrowserRouter } from 'react-router-dom';

describe('NewUser', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<BrowserRouter><NewUser location={{username: 'Johny'}} /></BrowserRouter>);
  });
  // it('matches the snapshot', () => {
  //   const tree = renderer.create(<NewUser />).toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
  // test('renders Navbar', () => {
  //   expect(wrapper.containsMatchingElement(<Navbar />)).toEqual(true);
  // });
  test('contains Routes', () => {
    expect(wrapper.find('.new-user')).toBeTruthy();
  });

  test('contains Routes', () => {
    expect(wrapper.containsMatchingElement(<Link />)).toBeTruthy();
  });

  test('contains 2 Links', () => {
      console.log(wrapper.debug());
    expect((wrapper.find('Link').length()).toEqual(2);
  });

   test('Has link to Tracker', () => {                                     
    let route = wrapper.find(<Link to='/tracker' />);
    expect(route).toBeTruthy();
   });

   test('Has link to Login Page', () => {   
    let wrap = mount(<BrowserRouter><NewUser location={{username: 'Johny'}} /></BrowserRouter>);  
    console.log(wrap.debug());                                     
    let route = wrap.find(<Link to='/' />);
    expect(route).toBeTruthy();
   });

});

