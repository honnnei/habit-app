import React, { Component } from 'react';
import Logo from '../img/marble.png';

export class Nav extends Component {
    render() {
        return (
            <div>
                <nav class="nav navHeader navbarHome">
                    <h3><img className="logoHead" src={Logo} alt="logo"/> Marbles - Habit Tracker</h3>
                </nav>
            </div>
        )
    }
}

export default Nav

