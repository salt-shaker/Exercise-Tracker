import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//import { Redirect } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import TrackerNavbar from "./components/navbar.component.js";
import ExerciseList from "./components/exercise-list.component.js";
import ExerciseEdit from "./components/exercise-edit.component.js";
import ExerciseCreate from "./components/exercise-create.component.js";
import UserCreate from "./components/user-create.component.js";
import Dashboard from "./components/dashboard.component.js";

function App() {
  return (
    <Router>
        <TrackerNavbar/>
        <br/>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/exercise" component={ExerciseList} />
        <Route path="/edit/:id" component={ExerciseEdit} />
        <Route path="/create" component={ExerciseCreate} />
        <Route path="/user" component={UserCreate}/>
    </Router>
  );
}


//<Redirect to={{pathname: "/dashboard"}} />
export default App;
