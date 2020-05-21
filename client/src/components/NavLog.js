import React, { Component } from 'react'

export class NavLog extends Component {
    render() {
        return (
            <div>
                <nav className="nav navbarContainer" >
                    <h3>Marbles - Habit Tracker</h3>
                    <a className="nav-link active logOutButton" href="/">Log Out</a>
                </nav>
            </div>
        )
    }
}

export default NavLog

