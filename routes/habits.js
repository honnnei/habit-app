const express = require('express');
const router = express.Router();
const {MongoClient} = require("mongodb")


MongoClient.connect("mongodb://localhost/HabitTracker", { useUnifiedTopology: true })
  .then(dbAPI => {
    console.log('Connected to Database')
    const db = dbAPI.db("HabitTracker")
    const usersCollection = process.env.NODE_ENV === "test" ? db.collection("testing") : db.collection('users')

    //Get all users
    router.get('/all', (req, res) => {
        usersCollection.find().toArray() //Read a document in the database
        .then(results => {
          (result) ? res.send(result) //If one or more documents exist 
          : res.send("No documents"); //If there are no documents
          })
        .catch(error => console.error(error))
    });
    
    //Get a single user
    router.get('/:username', (req, res) => {
      req.params.username = req.params.username.toLowerCase();
      usersCollection.findOne({"username": {$eq:req.params.username}}) //Read a document in the database
      .then(result => {
        (result) ? res.send(result) //If the document does exist 
        : res.send("User does not exist"); //If the document does not exist 
      })
      .catch(error => res.status(500).send(error))
    });
    
    //Add a new user
    router.post('/add-user', (req, res) => {
        req.body.username = req.body.username.toLowerCase(); 
        usersCollection.findOne({"username": {$eq:req.body.username}}) //Read a document in the database
        .then(result => {
          if (result) { //If the document does exist
            res.send("User already exists");
          } else { //If the document does not exist  
            usersCollection.insertOne(req.body) //Create a document in the database
            .then(result => {
              res.send("User added");
            })
            .catch(error => res.status(500).send(error)); 
          };
        })
        .catch(error => res.status(500).send(error)); 
    });

    //Add a new habit to a user**
    router.put('/add-habit/:username', (req, res) => {
        req.params.username = req.params.username.toLowerCase();
        usersCollection.findOne({"username": {$eq:req.body.username}}) //Read a document in the database
        .then(result => {
          if (result) { //If the document does exist
            usersCollection.updateOne({"username": req.params.username}, {$push: {"habit": req.body}}, true, false) //Update a document in the database
            .then(
                res.send()
            )
            .catch(error => res.status(500).send(error)); 
          } else { //If the document does not exist
            res.send("User does not exist"); 
          };
        })
        .catch(error => res.status(500).send(error)); 
    });

    //Update a new habit to a user - unfinished
/*     router.put('/update-habit/:username/:habitName', (req, res) => {
      console.log(req.body)
    usersCollection.updateOne({"username": req.params.username, "habit.habitName":  req.params.habitName },
    { $set: {"": ""}})
    .then(
        res.send("Posted something to the database")
    )
    .catch(error => console.error(error))
    }); */

    // tracking route - Done?
    router.put('/update-habit/:username/:habitID/:indexTracking/:trueOrFalse', (req, res) => {
        req.params.username = req.params.username.toLowerCase();
      usersCollection.updateOne({ "username": req.params.username },
      {$set: { [`habit.${req.params.habitID}.tracking.${req.params.indexTracking}`] : req.params.trueOrFalse}}, true,false)
      .then(
          res.send("Tracking updated")
      )
      .catch(error => console.error(error))
      });

    //Delete a habit of a user*
    router.put('/delete-habit/:username/:habitID', (req, res) => {
        req.params.username = req.params.username.toLowerCase();
        console.log(req.params.habitID)
        usersCollection.updateOne({"username": req.params.username}, {$unset: {[`habit.${req.params.habitID}`] : 1}})
        .then(
            console.log("unset")
        )
        usersCollection.updateOne({"username": req.params.username}, {$pull : {"habit" : null}})
        .then(
            res.send("Deleted a habit from user")
        )
        .catch(error => console.error(error))
    });
    
    //Delete a user*
      router.delete('/delete-user/:username', (req, res) => {
        req.params.username = req.params.username.toLowerCase();
        usersCollection.deleteOne({"username": {$eq: req.params.username}})
        .then(
            res.send("Deleted a user from the database")
        )
        .catch(error => console.error(error))
    });
  });


module.exports = router;