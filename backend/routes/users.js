const router = require("express").Router();
//Need express router, if creating routes
let User = require("../models/user.model");
//Need to require mongoose model we created


//First endpoint that handles http get requests on the /users url path
router.route("/").get((req,res)=>{
    User.find()//mongoose method that returns all users
        .then(users => res.json(users))//returns users in json format
        .catch(err => res.status(400).json("error " + err));
});


//This 2nd endpoint handles incoming http post requests
router.route("/add").post((req,res) => {
    const username = req.body.username;

    const newUser = new User({username});
    //Creates new instance of user

    newUser.save()//Saves new user to db
        .then(() => res.json("user added!"))
        .catch(err => res.status(400).json("Error: "+ err));    
});

module.exports = router;//Just exports router