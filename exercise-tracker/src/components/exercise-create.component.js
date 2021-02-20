import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Components from "./components.js";
import axios from 'axios';


export default class ExerciseCreate extends Component {

    constructor(props) {
        super(props);

        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.removeToast = this.removeToast.bind(this);
        this.delayInput = this.delayInput.bind(this);
        this.f1 = this.f1.bind(this);
        this.randomKey = this.randomKey.bind(this);

        this.state = {
            username: '',
            description: '',
            duration: '',
            date: new Date(),
            toast: [],
            inputIsDisabled: false,
            users: [],
            exerciseLimit: 30
        }

}

componentDidMount() {
    axios.get('http://localhost:5000/users/')
    .then((res) => {
        this.setState({
            users: res.data.map(x => x.username),
        })
    })
    .catch(err => console.log(' ' + err));
}

onChangeUserName(e) {
    this.setState({
        username: e.target.value
    })
}


onChangeDescription(e) {
    this.setState({
        description: e.target.value
    })
}

onChangeDuration(e) {
    this.setState({
        duration: e.target.value
    })
}

onChangeDate(e) {
    this.setState({
        date: e
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

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        axios.post('http://localhost:5000/exercises/add', exercise)
            .then((res) => {
                if (res.data.exerciseAdd) {
                    let newToast = {
                        title: "Success",
                        message: 'Exercise added',
                        keyid: this.randomKey
                    }
                    if (this.state.toast.length > 0) {
                        this.setState({
                            toast: [...this.state.toast, newToast],
                        })
                        console.log(this.state);
                        this.f1(newToast.keyid);
                    } else {
                        this.setState({
                            toast: [newToast],
                        })
                        console.log(this.state);

                        this.f1(newToast.keyid);
                    }
                } else {
                    let errorMessage = '';
                    if (res.data.maxLimit) errorMessage = "User limit reached";

                    let newToast = {
                        username: this.state.username,
                        title: "Failed",
                        message: errorMessage,
                        keyid: this.randomKey
                    }
                    if (this.state.toast.length > 0) {
                        this.setState({
                            toast: [...this.state.toast, newToast],
                        })
                        console.log(this.state);
                        this.f1(newToast.keyid);
                    } else {
                        this.setState({
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
            <h3> Create New Exercise</h3>
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
                    <label>Description:</label>
                    <input type="text"
                        required
                        className="form-control"
                        value={this.state.description}
                        onChange={this.onChangeDescription}
                    />
                </div>
                <div className="form-group">
                    <label>Duration: (Minutes)</label>
                    <input type="number"
                        required
                        className="form-control"
                        value={this.state.duration}
                        onChange={this.onChangeDuration}
                    />
                </div>
                <div className="form-group">
                    <label>Date:</label>
                    <div>
                        <DatePicker
                            selected={this.state.date}
                            onChange={this.onChangeDate}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <input type="submit" value="Create Log" className="btn btn-primary" />
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

                        {this.state.toast.map(block => <div key={this.randomKey() + ":ToastWrapper"}> {Components({componentType: 'popupToast', data: block})} </div>)}

                    </div>
                </div>
        </div>
    )
}
}