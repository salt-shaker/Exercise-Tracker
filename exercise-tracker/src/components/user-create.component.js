import React, { Component } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import Components from "./components.js";
import axios from 'axios';


export default class UserCreate extends Component {

    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDeleteUsername = this.onChangeDeleteUsername.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.removeToast = this.removeToast.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.delayInput = this.delayInput.bind(this);
        this.f1 = this.f1.bind(this);
        this.randomKey = this.randomKey.bind(this);
        this.deleteUser = this.deleteUser.bind(this);

        this.state = {
            username: '',
            deleteUsername: '',
            toast: [],
            inputIsDisabled: false,
            users: [],
            objUsers: [],
            userLimit: 30
        }
    }


    componentDidMount() {
        axios.get('http://localhost:5000/users/')
            .then((res) => {
                this.setState({
                    users: res.data.map(x => x.username),
                    objUsers: res.data,
                    deleteUsername: res.data[0].username
                })
            })
            .catch(err => console.log(' ' + err));
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    onChangeDeleteUsername(e) {
        this.setState({
            deleteUsername: e.target.value
        })
    }

    removeToast(keyid) {
        return new Promise(e => {
            setTimeout(() => {
                this.setState({
                    toast: this.state.toast.filter(e => keyid !== e.keyid)
                })
                console.log(this.state.toast.filter(e => keyid !== e.keyid))
                Promise.resolve(`Key ${keyid} Removed`);
            }, 5000);
        });

    }

    deleteUser(e) {
        e.preventDefault();
        const user = this.state.objUsers.find(user => user.username === this.state.deleteUsername);
        //console.log(JSON.stringify(user));
        axios.delete('http://localhost:5000/users/i/' + user._id)
            .then((res) => {
                console.log(res.data);
                this.setState({
                    objUsers: this.state.objUsers.filter(el => el._id !== user._id),
                    users: this.state.users.filter(el => el !== user.username)
                })

                axios.get('http://localhost:5000/users/')
                    .then((res) => {
                        this.setState({
                            users: res.data.map(x => x.username),
                            objUsers: res.data,
                            deleteUsername: res.data[0].username
                        })
                    })
                    .catch(err => console.log(' ' + err));
            })
            .catch(err => console.log(' ' + err));


    }

    delayInput(x, fx) {
        return new Promise(() => {
            setTimeout(() => {
                fx();
                Promise.resolve();
            }, x);
        });
    }

    async f1(keyid) {
        var x = await this.removeToast(keyid);
        console.log(x); // 10
        //this.removeToast(key)
    }

    randomKey() {
        return Math.floor((Math.random() * 100) * (Date.now() * 3.14))
    }

    onSubmit(e) {
        e.preventDefault();

        if (!this.state.inputIsDisabled) {
            this.setState({
                inputIsDisabled: true
            })

            this.delayInput(1000, () => this.setState({ inputIsDisabled: false }))

            const user = {
                username: this.state.username,
            }

            //const randomKey = Math.floor((Math.random() * 100) * (Date.now() * 3.14));
            console.log(user);

            axios.post('http://localhost:5000/users/add', user)
                .then((res) => {
                    if (res.data.userAdd) {
                        let newToast = {
                            title: "Success",
                            message: `${this.state.username} added`,
                            keyid: this.randomKey
                        }
                        if (this.state.toast.length > 0) {
                            this.setState({
                                username: '',
                                toast: [...this.state.toast, newToast],
                                users: [...this.state.users, user.username]
                            })
                            console.log(this.state);
                            this.f1(newToast.keyid);
                        } else {
                            this.setState({
                                username: '',
                                toast: [newToast],
                                users: [...this.state.users, user.username]
                            })
                            console.log(this.state);

                            this.f1(newToast.keyid);
                        }
                    } else {
                        let errorMessage = '';
                        if (res.data.userExist) errorMessage = "Duplicate user";
                        if (res.data.maxLimit) errorMessage = "User limit reached";

                        let newToast = {
                            username: this.state.username,
                            title: "Failed",
                            message: errorMessage,
                            component: 'popupToast',
                            keyid: this.randomKey
                        }
                        if (this.state.toast.length > 0) {
                            this.setState({
                                username: '',
                                toast: [...this.state.toast, newToast],
                            })
                            console.log(this.state);
                            this.f1(newToast.keyid);
                        } else {
                            this.setState({
                                username: '',
                                toast: [newToast],
                            })
                            console.log(this.state);

                            this.f1(newToast.keyid);
                        }
                    }

                })
                .catch(err => console.log(' ' + err));




        } else {
            console.log('Error: Too many request. Please wait then try again.');
        }
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
                            onChange={this.onChangeUsername}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" disabled={this.state.inputIsDisabled} />
                    </div>

                </form>
                <form onSubmit={this.deleteUser}>
                    <h3> Delete User</h3>
                    <div className="form-group">
                        <label>Existing Users: ({this.state.users.length}/{this.state.userLimit} max)</label>
                        <select
                            required
                            className="form-control"
                            value={this.state.deleteUsername}
                            onChange={this.onChangeDeleteUsername}>
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
                        <input type="submit" value="Delete User" className="btn btn-primary" />
                    </div>
                </form>

                <div
                    aria-live="polite"
                    aria-atomic="true"
                    style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        minHeight: '200px',
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            width: 'auto'
                        }}
                    >

                        {this.state.toast.map(block => <div key={this.randomKey() + ":ToastWrapper"}> {Components({ componentType: 'popupToast', data: block })} </div>)}

                    </div>
                </div>



            </div>

        )
    }
}