import React, { Component } from 'react';
import axios from 'axios';

export default class TestEdit extends Component {
    constructor(props) {
        super(props);

        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
        }
    }

    componentDidMount() {
        this.setState({
            username: "Santa"
        })
    }

    onChangeUserName(e) {
        this.setState({
            username: e.target.value
        })
    }


   

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
        }

        console.log(user);

        axios.get('http://localhost:5000/dataPoint/xlmget', user)
        .then(res => console.log(res.data));

        //window.location = "/";

        this.setState({
            username: ''
        })
    }

    render() {
        return (
            <div className="container">
                <h3> Create New User</h3>
                <form onSubmit={this.onSubmit}>
                   
                    <div className="form-group">
                        <label>Username:</label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUserName}
                        />
                    </div>
                
                    <div className="form-group">
                        <input type="submit" value= "Create Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}