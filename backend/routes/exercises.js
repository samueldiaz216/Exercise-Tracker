const router = require ("express").Router();
//Need express router, if creating routes
let Exercise = require ("../models/exercise.models");
//Need to require mongoose model we created

router.route("/").get((req,res) => {
    Exercise.find()//Mongoose method to get all exercises
        .then(exercises => res.json(exercises))//returns exercises in json
        .catch(err => res.status(400).json("Error "+err));
})


router.route("/add").post((req,res) => { 
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    });

    newExercise.save()
    .then(()=> res.json("Exercise added!"))
    .catch(err => res.status(400).json("Error "+err));
});


//:id is like a variable. This is an object id that is created automatically by mongodb.
//This route gets a specific exercise and returns the info on it
router.route("/:id").get((req,res) => {
    Exercise.findById(req.params.id)//Gets id directly from url and finds specific exercise
        .then(exercise => res.json(exercise))//Returns info as json
        .catch(err => res.status(400).json("Error: " + err));
});

//Does same thing as above route, but deletes specific exercise.
router.route("/:id").delete((req,res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json("Exercise deleted."))
        .catch(err => res.status(400).json("Error: " + err));
});


//This route finds a specific exercise and updates it.
router.route("/update/:id").post((req,res) => {
    Exercise.findById(req.params.id)//Gets id directly from url
        .then(exercise => {
            //assigns fields from json object sent to exercise element
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then(() => res.json("Exercise updated!"))
                .catch(err => res.status(400).json("Error " + err));
        })
        .catch(err => res.status(400).json("Error "+ err));
});

module.exports = router;
