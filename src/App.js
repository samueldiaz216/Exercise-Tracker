import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/navbar.component";
import ExerciseList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";


function App() {
  return(
  // This div uses bootstrap to make things prettier
  <div className="container">
    <Router>
      {/* Navbar must be in Router, because it uses router */}
      <Navbar/>
      
      <br/>
      <Route path="/" exact component={ExerciseList}/>
      <Route path="/edit/:id" component={EditExercise}/>
      <Route path="/create" component={CreateExercise}/>
      <Route path="/users" component={CreateUser}/>
    </Router>
  </div>
  );
}

export default App;
