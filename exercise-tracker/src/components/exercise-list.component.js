import React, { Component } from 'react';
import axios from 'axios';
import Components from "./components.js";

export default class ExerciseList extends Component {
    constructor(props) {
        super(props)

        this.deleteExercise = this.deleteExercise.bind(this);
        //this.exerciseList = this.exerciseList.bind(this);
        this.randomKey = this.randomKey.bind(this);

        this.state = ({
            exercises: [],
        })
    }

    componentDidMount() {
        axios.get('http://localhost:5000/exercises/')
            .then((res) => {
                this.setState({
                    exercises: res.data,
                })
            })
            .catch(err => console.log(' ' + err));
    }

    deleteExercise(id) {
        axios.delete('http://localhost:5000/exercises/i/' + id)
            .then((res) => {
                console.log(res.data);
                this.setState({
                    exercises: this.state.exercises.filter(el => el._id !== id)
                })
            })
            .catch(err => console.log(' ' + err));

        
    }

    /*
    exerciseList(){
        return this.state.exercises.map(currentExercise => {
                return <Exercise exercise={currentExercise} deleteExercise={this.deleteExercise} key={currentExercise._id} />
            }
        )
    }
    */

    //{this.exerciseList()}

    /*
    let newToast = {
        title: "Success",
        message: `${this.state.username} added`,
        component: 'exercise',
        keyid: this.randomKey
    }
    */

    randomKey() {
        return Math.floor((Math.random() * 100) * (Date.now() * 3.14))
    }




    render() {
        return (
            <div>
                <table id="example" className="display" width="100%"></table>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {this.state.exercises.map(block => <tbody key={this.randomKey() + ":Exercise"}>{Components({ componentType: 'exercise', data: block, arg: { deleteExercise: this.deleteExercise, keyid: this.randomKey() } })}</tbody>)}                    
                </table>
            </div>
        )
    }
}