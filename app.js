const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const recipe = require('./routes/recipe');
const bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use('/habits', recipe);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

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

module.exports = app;

