const express = require('express');
const router = express.Router();
const {MongoClient} = require("mongodb")


MongoClient.connect("mongodb://localhost/HabitTracker", { useUnifiedTopology: true })
  .then(dbAPI => {
    console.log('Connected to Database')
    const db = dbAPI.db("HabitTracker")
    const usersCollection = process.env.NODE_ENV === "test" ? db.collection("testing") : db.collection('users')

    //Get all**

    router.get('/all', (req, res) => {
        usersCollection.find().toArray()
        .then(results => {
            res.send(results)
          })
        .catch(error => console.error(error))
    });
    
    //Get a single user's habits** - error handling on case sensitivity
    router.get('/:username', (req, res) => {
      usersCollection.findOne({"username": {$eq:req.params.username}})
      .then(result => {
        res.send(result)
      })
    });
    
    //Add a new user - works sends data to db - add a way to check if user exists
    router.post('/add-user', (req, res) => {
        usersCollection.insertOne(req.body)
        .then(usersCollection.findOne({"username": {$eq:req.params.username}}))
        .then(function(result) {
          res.json(result);
        })
        .catch(function(error) {
          next(error);
        });
    });
   
    //Add a new habit to a user**
    router.put('/add-habit/:username', (req, res) => {
        console.log(req.body)
      usersCollection.updateOne({"username": req.params.username}, {$push: {"habit": req.body}}, true, false)
      .then(
          res.send()
      )
      .catch(error => console.error(error))
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
      usersCollection.updateOne({ "username": req.params.username },
      {$set: { [`habit.${req.params.habitID}.tracking.${req.params.indexTracking}`] : eval(req.params.trueOrFalse)}}, true,false)
      .then(
          res.send("Tracking updated")
      )
      .catch(error => console.error(error))
      });

    //Delete a habit of a user*
    router.put('/delete-habit/:username', (req, res) => {
        usersCollection.updateOne({"username": req.params.username}, { $pull: { "habit" : { "name": req.body.habitName } } })
        .then(
            res.send("Deleted something to the database")
        )
        .catch(error => console.error(error))
    });
    
    //Delete a user*
      router.delete('/delete-user/:username', (req, res) => {
        usersCollection.deleteOne({"username": {$eq: req.params.username}})
        .then(
            res.send("Deleted something to the database")
        )
        .catch(error => console.error(error))
    });
  });


module.exports = router;