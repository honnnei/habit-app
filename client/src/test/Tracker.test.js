import React from 'react';
import { render } from '@testing-library/react';
import Tracker from '../containers/Tracker';
import { shallow, mount } from 'enzyme';
import { Link, BrowserRouter } from 'react-router-dom';

describe('Tracker', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<BrowserRouter><Tracker location={{username: 'Johny'}}/></BrowserRouter>);
  });

  test('contains Routes', () => {
    expect(wrapper.find('.trackerDiv')).toBeTruthy();
  });

  // // test('contains a Link', () => {
  // //   expect((wrapper.find('Link').length)).toEqual(1);
  // // });

  // test('has a Link to /habit/add', () => {
  //     let wrap = shallow (<BrowserRouter><Tracker location={{username: 'Johny'}}/></BrowserRouter>)
  //     let route = wrap.find(<Link to='/habit/add' />)
  //     expect(route).toBeTruthy();
  // });
});

