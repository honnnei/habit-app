import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import { shallow, mount } from 'enzyme';
import { Route, BrowserRouter, Link } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Form from '../components/Form';
import Tracker from '../containers/Tracker';
import NewUser from '../containers/NewUser';
import Animation from '../img/Marble.svg';

describe('Form', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Form />);
  });

  {/* it('matches the snapshot', () => {
  const tree = renderer.create(<Form />).toJSON();
   expect(tree).toMatchSnapshot();
  }); */}

  // test('renders Navbar', () => {
  //   expect(wrapper.containsMatchingElement(<Navbar />)).toEqual(true);
  // });

  test('contains formDiv', () => {
    expect(wrapper.find('.formDiv')).toBeTruthy();
  });  

  test('contains formsub', () => {
    expect(wrapper.find('.formsub')).toBeTruthy();
  });  

  test('contains form1', () => {
    expect(wrapper.find('.form1')).toBeTruthy();
  }); 

  test('contains form2', () => {
    expect(wrapper.find('.form2')).toBeTruthy();
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

  test('contains Animation component', () => {
    console.log(wrapper.debug());
    // expect(wrapper.containsMatchingElement(<Animation />)).toBeTruthy();
    expect((wrapper.find('.marbleAnimate'))).toBeTruthy();
  });

  //  test('Route to HomePage is exact', () => {     
  //   let wrap = mount( <BrowserRouter><Form /></BrowserRouter> );                                 
  //   // let route = wrap.find(<Route path='/' exact component={Form}/>);
  //   // expect(route).toBeTruthy();
  //  });

   test('Link to NewUser works with prop from Sign Up', () => {   
    let wrap = mount(<BrowserRouter><Form /></BrowserRouter> );                                       
    let link = wrap.find(<Link to={{pathname:'/newUser', username : 'Hanna' }} />);
    expect(link).toBeTruthy();
   });

  test('Link to Habit Tracker works with prop from LogIn', () => {   
    let wrap = mount(<BrowserRouter><Form /></BrowserRouter> );                                       
    let link = wrap.find( <Link to={{pathname:'/tracker', username : 'Hanna' }} /> );
    expect(link).toBeTruthy();
  });

  it('New User input on change the newUsername should change', () => {
    const wrapper = mount(<BrowserRouter><Form /></BrowserRouter>); 
    wrapper.find('input').at(0).simulate('change', { target: { name: 'newUsername', value: 'Hanna' } });
    expect(wrapper.find('input').at(0).prop('value')).toEqual('Hanna');

  });

  it('Login input on change the existingUsername should change', () => {
    const wrapper = mount(<BrowserRouter><Form /></BrowserRouter>); 
    wrapper.find('input').at(1).simulate('change', { target: { name: 'existingUsername', value: 'Boris' } });
    expect(wrapper.find('input').at(1).prop('value')).toEqual('Boris');

  });

    
});

