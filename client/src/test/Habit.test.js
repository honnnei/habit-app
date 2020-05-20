import React from 'react';
import { render } from '@testing-library/react';
import Habit from '../components/Habit';
import { shallow, mount } from 'enzyme';
import { Link, BrowserRouter } from 'react-router-dom';

describe('Habit', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<BrowserRouter><Habit/></BrowserRouter>);
  });

  // it('matches the snapshot', () => {
  //   const tree = renderer.create(<Habit />).toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
  // test('renders Navbar', () => {
  //   expect(wrapper.containsMatchingElement(<Navbar />)).toEqual(true);
  // });
  test('contains Habit container div', () => {
    expect(wrapper.find('.habit-container')).toBeTruthy();
  });

  // test('contains Routes', () => {
  //   expect(wrapper.containsMatchingElement(<Link />)).toEqual(true);
  // });

// //   test('contains Routes', () => {
// //     expect(wrapper.find('input')).prop('to').toEqual('/tracker');
// //   });

// //   test('contains 1 Link', () => {
// //     expect((wrapper.find('Link').length)).toEqual(1);
// //   });

//    test('Has link to Tracker', () => {     
//     let wrap = shallow(<BrowserRouter><Habit /></BrowserRouter>);                                 
//     let route = wrap.find(<Link to='/tracker' />);
//     expect(route).toBeTruthy();
//    });

});

