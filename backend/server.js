const express = require("express");
const app = express();
var bodyParser = require("body-parser");
app.use(express.static(__dirname));
app.use(bodyParser.json());
var fs = require("fs");
const { json } = require('express');
const { parse } = require('path');

// variable for tweet data from favs.json
var tweetInfo = [];
// variable to store searched tweets from frontend
var searchedTweets = [];

// load the input file
fs.readFile("favs.json", "utf8", function readFileCallback(err, data) {
  if (err) {
    req.log.info("cannot load a file:" + fileFolder + "/" + _file_name);
    throw err;
  } else {
    try {
      tweetInfo = JSON.parse(data);
    } catch (err) {
      console.log("Error parsing JSON string:", err);
    }
  }
});

// Shows user info (users' IDs)
/* iterate through tweetInfo and send response in json */
app.get("/tweets", function (req, res) {
  var idStr = [];
  for (var i = 0; i < tweetInfo.length; i++) {
    idStr.push({
      id: tweetInfo[i].user.id,
      screen_name: tweetInfo[i].user.screen_name,
      name: tweetInfo[i].user.name,
    });
  }
  res.json(idStr);
});

// Shows all tweets
/* iterate through tweetInfo and send response*/
app.get("/tweetinfo", function (req, res) {
  var tweetObject = [];
  for (var i = 0; i < tweetInfo.length; i++) {
    tweetObject.push({
      created_at: tweetInfo[i].created_at,
      text: tweetInfo[i].text,
      id: tweetInfo[i].id,
    });
  }
  res.send(tweetObject);
});

// Shows searched tweets
/* sends all tweets that have been searched for by using the post
request version of this request */
app.get("/searchinfo", function (req, res) {
  res.send(searchedTweets);
});

// Post functions

// Posts created tweets
/* split the post request into tweet id and tweet content, add to tweetInfo */
app.post("/tweetinfo", function (req, res) {
  var inputTweet = req.body.inputTweet.toString();
  if (inputTweet.indexOf(";") != -1) {
    var tweetArray = req.body.inputTweet.split(";");
    tweetInfo.push({ id: parseInt(tweetArray[0]), text: tweetArray[1] });
    res.send(`Successful post of tweet with id: ${parseInt(tweetArray[0])}`);
  } else {
    console.log("no semicolon included");
  }
});

// Posts searched tweets
/* get id in form of integer, loop through tweetInfo to find any matches,
adds tweets to searchedTweets if any found, and send back foundTweets
array associated with this request */ 
app.post("/searchinfo", function (req, res) {
  var IDToSearch = parseInt(req.body.searchID);
  var foundTweets = [];
  for (var i = 0; i < tweetInfo.length; i++) {
    console.log(tweetInfo[i].id);
    console.log(IDToSearch);
    if (tweetInfo[i].id === IDToSearch) {
      console.log("match");
      searchedTweets.push({
        created_at: tweetInfo[i].created_at,
        text: tweetInfo[i].text,
        id: tweetInfo[i].id,
      });
      foundTweets.push({
        created_at: tweetInfo[i].created_at,
        text: tweetInfo[i].text,
        id: tweetInfo[i].id,
      });
      res.send(foundTweets);
    }
  }
});

//Update
/* search for the username to change, if found then directly edit the user.screen_name
inside tweetInfo */
app.put("/tweets/:nm", function (req, res) {
  var newScreenName = req.body.newScreenName.toString();
  if (newScreenName.indexOf(";") != -1) {
    var screenNameArray = newScreenName.split(";");
    for (var i = 0; i < tweetInfo.length; i++) {
      if (tweetInfo[i].user.name === screenNameArray[0]) {
        tweetInfo[i].user.screen_name = screenNameArray[1];
        res.send(`Successful rename of: ${screenNameArray[0]}`);
      }
    }
  } else {
    console.log("no semicolon included");
  }
});

//Delete
/* search for the tweet to be deleted by searching the ID inside tweetInfo,
if index exists then remove entire entry inside of tweetInfo */
app.delete("/tweetinfo/:tweetid", function (req, res) {
  var indexToRemove = -1;
  var inputIDIndex = parseInt(req.body.inputID);
  for (var i = 0; i < tweetInfo.length; i++) {
    if (tweetInfo[i].id === inputIDIndex) {
      indexToRemove = i;
      break;
    }
  }
  if (indexToRemove > -1) {
    tweetInfo.splice(indexToRemove, 1);
  } else {
    console.log("Invalid TweetID");
  }
});

app.listen(3000, function () {
  console.log("Server listening on " + 3000);
});
