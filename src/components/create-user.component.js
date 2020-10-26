import React, {Component} from "react";
import axios from "axios";

export default class CreateUser extends Component {
    constructor(props){
       
        super(props);

        //In order to make sure that "this" keyword refers to the class
        //you need to bind it to each of the methods. Otherwise, it'd be undefined
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        //Setting initial state 
        this.state = {
            // We will create properties that will correspond to the fields in thw 
            // mongodb document
            username: ""
        }
        //State is how we create variables in react
        //Whenevver you update the state, your values will 
        //be automatically updated


    }//End of constructor

    onChangeUsername(e){
        this.setState({
            username:e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();//Prevents what submit would have normally done

        const user ={
            username: this.state.username
        }

        axios.post("http://localhost:3000/users/add",user)
            .then(res => console.log(res.data));

        console.log(user);
        
        
        this.setState({
            username:''
        })

    }

    render(){
        return(
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required//Error message pops up if user clicks submoit without entering anyhting in this input
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                            />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}