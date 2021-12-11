import React, { Component } from 'react'
import { NavLink } from "react-router-dom";
import './Navbar.css'

export default class Navbar extends Component {
    render() {
        return (
            <div className="body">
                <nav className="Navbar">
                    <div className="item-group">
                        <NavLink className="item" to="/" exact={true}>
                            Explore
                        </NavLink>

                        <NavLink className="item" to="/upload">
                            Upload an Inspiration
                        </NavLink>
                        <NavLink className="item" to="/about">
                            Your Favorites
                        </NavLink>
                    </div>
                </nav>
                <div className="clear"></div>
            </div>
        )
    }
}
