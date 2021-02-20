import React, { Component } from 'react';

export default class TestComp extends Component {
    constructor(props) {
        super(props);

        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeString = this.onChangeString.bind(this);
        this.onChangeNumber = this.onChangeNumber.bind(this);
        this.onChangeBool = this.onChangeBool.bind(this);
        this.onChangeArray = this.onChangeArray.bind(this);
        this.componentDidMount= this.componentDidMount.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            users: [],
            string: '',
            number: 0,
            bool: false,
            array: [],
        }
    }

    componentDidMount() {
        this.setState({
            users: ['Santa'],
            username: "Santa"
        })
    }

    onChangeUserName(e) {
        this.setState({
            username: e.target.value
        })
    }


    onChangeString(e) {
        this.setState({
            string: e.target.value
        })
    }

    onChangeNumber(e) {
        this.setState({
            number: e.target.value
        })
    }

    onChangeBool(e) {
        this.setState({
            bool: e.target.value
        })
    }

    onChangeArray(e) {
        this.setState({
            array: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            string: this.state.string,
            number: this.state.number,
            bool: this.state.bool,
            array: this.state.array,
        }

        console.log(exercise);

        //window.location = "/";
    }

    render() {
        return (
            <div className="container">
                <h3> Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select 
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUserName}>
                            {
                                this.state.users.map(user => {
                                    return <option
                                        key={user}
                                        value={user}>{user}
                                    </option>
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>String:</label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.string}
                            onChange={this.onChangeString}
                        />
                    </div>
                    <div className="form-group">
                        <label>Number:</label>
                        <input type="number"
                            required
                            className="form-control"
                            value={this.state.number}
                            onChange={this.onChangeNumber}
                        />
                    </div>
                    <div className="form-group">
                        <label>Bool:</label>
                        <input type="bool"
                            required
                            className="form-control"
                            value={this.state.bool}
                            onChange={this.onChangeBool}
                        />
                    </div>
                    <div className="form-group">
                        <label>Array:</label>
                        <input type="text"
                            
                            className="form-control"
                            value={this.state.array}
                            onChange={this.onChangeArray}
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