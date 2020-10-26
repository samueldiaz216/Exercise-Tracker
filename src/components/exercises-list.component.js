//Homepage of our app that is showing all exercises in our database
import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

//Exercise component implemented as a functional react component
//This lacks state. If you don't need state, use a functional component
const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>
            <Link to={"/edit/"+props.exercise._id}>edit</Link>|<a href="#" onClick={()=>{props.deleteExercise(props.exercise._id)}}>delete</a>
        </td>
    </tr>
)

export default class ExerciseList extends Component {
    constructor(props){
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state={exercises:[]};
    }

    //React does this automatically before anything is displayed
    //Will get all exercises
    componentDidMount(){
        axios.get("http://localhost:3000/exercises/")//Route to get all exercises
            .then(res => {
                this.setState({exercises: res.data})//assigns array of exercises in db to state with all fields
            })
            .catch((err)=> {
                console.log(err);
            })
    }

    deleteExercise(id){
        axios.delete("http://localhost:3000/exercises/"+id)//Deletes from db
            .then(res => console.log(res.data));
        this.setState({
            exercises: this.state.exercises.filter(el => el._id != id)//Deletes from display
            //Filters displayed exercise list so it doesn't show exercise
            //with id that you just deleted
        })
    }

    exerciseList() {
        return this.state.exercises.map(currentexercise => {//For every exercise in the array it will return a component
            return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>; 
            //Each component is a row of the table
        })
    }


    render(){
        return(
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Dates</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList()}
                    </tbody>
                </table>
            </div>
        )
    }
}