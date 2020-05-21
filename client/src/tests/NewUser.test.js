import React from 'react';
import { render } from '@testing-library/react';
import NewUser from '../containers/NewUser';
import { shallow, mount } from 'enzyme';
import { Link, BrowserRouter } from 'react-router-dom';
import Tracker from '../containers/Tracker';

describe('NewUser', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NewUser location={{ username: 'Johny' }} />);
  });
  
   test('Has link to Tracker', () => {                                     
    let route = wrapper.find(<Link to='/tracker' />);
    expect(route).toBeTruthy();
   });

   test('contains new-user Div', () => {
    expect(wrapper.find('.new-user')).toBeTruthy();
  });  

  test('contains BackDiv', () => {
    expect(wrapper.find('.BackDiv')).toBeTruthy();
  });  

  test('Link to tracker when YES button clicked', () => {   
    let wrap = mount(<BrowserRouter><NewUser location={{ username: 'Johny' }}  /></BrowserRouter> );                                       
    let link = wrap.find( <Link to={{pathname:'/tracker', username: 'James' }} />);
    expect(link).toBeTruthy();
  });

  test('Link to / when NO button clicked', () => {   
    let wrap = mount(<BrowserRouter><NewUser location={{ username: 'Johny' }}  /></BrowserRouter> );                                       
    let link = wrap.find( <Link to='/' /> );
    expect(link).toBeTruthy();
  });

  test('Link to / when BACK button clicked', () => {   
    let wrap = mount(<BrowserRouter><NewUser location={{ username: 'Johny' }} /></BrowserRouter> );                                       
    let link = wrap.find( <Link to='/' /> );
    expect(link).toBeTruthy();
  });


});
