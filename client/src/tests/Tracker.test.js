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

  test('contains tracker container div', () => {
    expect(wrapper.find('.trackerDiv')).toBeTruthy();
  });  

  test('contains progress container div', () => {
    expect(wrapper.find('.progessDiv')).toBeTruthy();
  });  

  test('contains habit-container container div', () => {
    expect(wrapper.find('.habit-container')).toBeTruthy();
  });  

  test('contains BackDiv container div', () => {
    expect(wrapper.find('.BackDiv')).toBeTruthy();
  });  

  test('contains Buttons', () => {
    expect(wrapper.find('button')).toBeTruthy();
  }); 

  test('contains Form', () => {
    expect(wrapper.find('form')).toBeTruthy();
  }); 

  test('contains Labels', () => {
    expect(wrapper.find('label')).toBeTruthy();
  }); 

  test('contains Inputs', () => {
    expect(wrapper.find('input')).toBeTruthy();
  }); 
  
  test('contains Modal', () => {
    expect(wrapper.find('Modal')).toBeTruthy();
  });
  
  test('contains ModalBody', () => {
    expect(wrapper.find('ModalBody')).toBeTruthy();
  }); 

  test('contains ModalFooter', () => {
    expect(wrapper.find('ModalFooter')).toBeTruthy();
  }); 
  
  // test('contains Routes', () => {
  //   expect(wrapper.find('.trackerDiv')).toBeTruthy();
  // });


  // // test('contains a Link', () => {
  // //   expect((wrapper.find('Link').length)).toEqual(1);
  // // });

  // test('has a Link to /habit/add', () => {
  //     let wrap = shallow (<BrowserRouter><Tracker location={{username: 'Johny'}}/></BrowserRouter>)
  //     let route = wrap.find(<Link to='/habit/add' />)
  //     expect(route).toBeTruthy();
  // });
});

