import React, { Component } from 'react';
import Logo from '../img/marble.png';

export class NavLog extends Component {
    render() {
        return (
            <div>
                <nav className="nav navbarContainer" >
                    <h1><img className="logoHead" src={Logo} alt="logo"/> Marbles</h1>
                    <a className="nav-link active logOutButton" href="/">Log Out</a>
                </nav>
            </div>
        )
    }
}

export default NavLog

