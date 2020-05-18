// todo add routes
const express = require('express');
const router = express.Router();
const {MongoClient} = require("mongodb")


MongoClient.connect("mongodb://localhost/HabitTracker", { useUnifiedTopology: true })
  .then(dbAPI => {
    console.log('Connected to Database')
    const db = dbAPI.db("HabitTracker")
    const usersCollection = db.collection('users')
    
    router.get('/all', (req, res) => {
        usersCollection.find().toArray()
        .then(results => {
            res.send(results)
          })
        .catch(error => console.error(error))
    });
    //get single User habits
    router.get('/:username', (req, res) => {
      usersCollection.find().toArray()
      .then(results => {
          res.send(results)
        })
      .catch(error => console.error(error))
  });


  //Add a new user
    router.post('/add-user', (req, res) => {
        usersCollection.insertOne(req.body)
        .then(
            res.send("Posted something to the database")
        )
        .catch(error => console.error(error))
    });
   
    //Add a new habit to a user
    router.put('/add-habit/:username', (req, res) => {
      usersCollection.insertOne(req.body)
      .then(
          res.send("Posted something to the database")
      )
      .catch(error => console.error(error))
    });
//Delete a habit of a user
    router.put('/delete-habit/:username', (req, res) => {
        usersCollection.deleteOne({"id": req.params.id})
        .then(
            res.send("Deleted something to the database")
        )
        .catch(error => console.error(error))
    });
    //Delete a user
      router.delete('/delete-user/:username', (req, res) => {
        usersCollection.deleteOne({"id": req.params.id})
        .then(
            res.send("Deleted something to the database")
        )
        .catch(error => console.error(error))
    });
  });


module.exports = router;