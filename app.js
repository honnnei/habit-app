const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const habits = require('./routes/habits');
const bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
/* const {MongoClient} = require("mongodb")
const url = "mongodb://localhost"

MongoClient.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true}, (err, client) => {
  if (err) {
    return console.error(err)
}
  
}) */

app.use('/habits', habits);


app.get('/', function(req, res) {
    res.send('OK');
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error:  err
  });

});


app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

module.exports = app;

