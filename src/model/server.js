const models = require('./modelSchema');
var recommender = require('recommender');
var ratings = [
  [4, 0, 0, 1, 1, 0, 0],
  [5, 5, 4, 0, 0, 0, 0],
  [0, 0, 0, 2, 4, 5, 0],
  [3, 0, 0, 0, 0, 0, 3]
];
var userIndex = 2;
var movieIndex = 0;

// We are predicting the rating of U05 for M1.
var predictedRating = recommender.getRatingPrediction(ratings, movieIndex, userIndex, (predictedRating) => {
  console.log(predictedRating);
  // Output: 4
});

var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))


app.get('/view/*', (req, res) => {
  res.sendFile(req.params[0], {
    root: './src/view/'
  });
});

app.get('/bower_components/*', (req, res) => {
  res.sendFile(req.params[0], {
    root: './bower_components/'
  });
});

app.post('/hotelanduserbook', (req, res, next) => {
  console.log('req<<<<<', req);
  models['User'].create({
    username: req.body.userName,
    rating: req.body.hotelNamesAndRatings[0].rating,
    hotelNamesAndRatings: req.body.hotelNamesAndRatings,
    createdAt: Date.now(),
    lastModifiedAt: Date.now(),
  });
  models['Hotel'].create({
    hotelname: req.body.hotelNamesAndRatings[0].hotelName,
    createdAt: Date.now(),
    lastModifiedAt: Date.now(),
    elementCount: 0,
  });
  setTimeout(function() {
    res.send("success");
  }, 5000);
});

app.get('/hotelrecommend', (req, res, next) => {
  models.User.find({}, (err, userDetails) => {
    let temp = [];
    for (i = 0; i < arr.length; i++) {
      for (j = 0; j < arr[i]['hotelNamesAndRatings'].length; j++) {
        temp.push(arr[i]['hotelNamesAndRatings'][j])
      }
    }
    res.send(userDetails);
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000');
});
