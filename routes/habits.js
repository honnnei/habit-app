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

    router.post('/post', (req, res) => {
        usersCollection.insertOne(req.body)
        .then(
            res.send("Posted something to the database")
        )
        .catch(error => console.error(error))
    });
    router.delete('/delete/:id', (req, res) => {
        usersCollection.deleteOne({"id": req.params.id})
        .then(
            res.send("Deleted something to the database")
        )
        .catch(error => console.error(error))
    });
  });


module.exports = router;