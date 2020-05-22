import React, { Component } from 'react';
import Logo from '../img/marble.png';

export class Nav extends Component {
    render() {
        return (
            <div>
                <nav class="nav navHeader navbarHome">
                    <h4>Don't lose Y<img className="logoHead" src={Logo} alt="logo"/>UR Marbles!</h4>
                </nav>
            </div>
        )
    }
}

export default Nav

