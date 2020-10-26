const mongoose = require("mongoose");//Requires mongoose

const Schema = mongoose.Schema; //To make schemas

const userSchema = new Schema({
    username:{
        //Validations to username
        type: String,
        required: true,
        unique: true,
        trim: true, //trims off whitespace
        minLength: 3 //Must be at least 3 characters long

    },
},{timestamps: true,//Creates fields for when it was created and modified
});

const User = mongoose.model("User", userSchema);

module.exports = User; 

//Alot of this will look the same for any mongoose schema