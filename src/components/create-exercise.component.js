//Will allow us to add exercises into the database.
import React, {Component} from "react";
import axios from "axios";
import DatePicker from  "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"//Styling for datepicker

export default class CreateExercise extends Component {
    constructor(props){
        // in javascript classses you always need to call the super constructor
        // when defining the constructor of a subclass
        // All react component classes that have a constructor shold
        // start with a super(props) call
        super(props);

        //In order to make sure that "this" keyword refers to the class
        //you need to bind it to each of the methods. Otherwise, it'd be undefined
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        //Setting initial state 
        this.state = {
            // We will create properties that will correspond to the fields in thw 
            // mongodb document
            username: "",
            description: "",
            duration: 0,
            date: new Date(),
            users:[]//dropdown list for user to be associated with exercise
        }
        //State is how we create variables in react
        //Whenever you update the state, your values will 
        //be automatically updated


    }//End of constructor

        //This is a react life cycle method
        //Automatically called by react in different points
        //this method will automatically be called right before 
        //anything displays on the page
        componentDidMount(){
            axios.get("http://localhost:3000/users/")//Will get users from db
            .then(res => {
                //res.data is the array returned with all the users
                if(res.data.length > 0){//Checks if there are users in the db
                    this.setState({
                        users: res.data.map(user => user.username),//Displays username for each user in db
                        username: res.data[0].username
                        //username should automatically be set to the first user in the drop down menu
                    })
                }
            });
        }

        //The following 4 methods are used to change the state of a field
        onChangeUsername(e){
            this.setState({
                username:e.target.value
            });
        }

        onChangeDescription(e){
            this.setState({
                description:e.target.value
            });
        }
        
        onChangeDuration(e){
            this.setState({
                duration:e.target.value
            });
        }

        //For dates it's a little different. We will use a library to so you can pick 
        //a date and then we will assign that to the field.
        onChangeDate(date){
            this.setState({
                date: date
            });
        }

        onSubmit(e){
            e.preventDefault();//Prevents what submit would have normally done

            const exercise ={
                username: this.state.username,
                description: this.state.description,
                duration: this.state.duration,
                date: this.state.date
            }

            console.log(exercise);
            //This will eventually be the place where we submit an exercise to the database
            axios.post("http://localhost:3000/exercises/add",exercise)
                .then(res => console.log(res.data));
            //After the user will be sent back to the home page with this command...
            window.location = "/";

        }

    render(){
        return(
            <div>
                <h3>Create New Exercise Log</h3>
                {/* Html form. onSubmit will be called when form submitted*/}
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        {/* Select box is drop down menu */}
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                            {
                                //Array of users
                                this.state.users.map(function(user) {
                                    return <option//Option on the selectbox for each array item
                                        //Key which is the user
                                        key={user}
                                        //Value which is the user and text which is the user.
                                        value={user}>{user}
                                        </option>
                                })
                            }
                        </select>    
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            />
                    </div>
                    <div className="form-group">
                        <label>duration (in minutes): </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                        />

                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Exercise Log" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}