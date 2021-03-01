import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default class TrackerNavbar extends Component {

    render() {
        return (
                <Navbar expand="lg">
                    <Link className="navbar-brand" to="/dashboard">Exercise Tracker</Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Link to="/dashboard" className="nav-link">Dashboard</Link>
                            <Link to="/exercise" className="nav-link">Exercise List</Link>
                            <Link to="/create" className="nav-link">Create Exercise Log</Link>
                            <Link to="/user" className="nav-link">Create User</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
        )
    }
}