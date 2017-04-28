const twit = require('twit')
const config = require('../config.js')
const express = require('express')
const T = new twit(config)
const db = require('../database/database.js')
const router = express.Router()

/* GET home page. */
function getAll() {
  db.getAllTweets().then(data => {
    for(let i = 0; i < data.length; i++) {
      allTweets.push(data[i].tweetText)
    }
  })
}

function getOneTweet() {
  getAll()
  const arrayLength = allTweets.length
  const index = Math.floor((Math.random() * arrayLength) + 1)
  return allTweets[index]
}

const params = {
  q: 'beyonce',
  count: 15
}

T.get('search/tweets', params, gotData)

function gotData(err, data, response) {
  const tweets = data.statuses
  for(let i = 0; i < tweets.length; i++) {
    console.log(tweets[i].text)
  }
}

function tweetIt() {
  const allTweets = []
  db.getAllTweets()
  .then(data => {
    for(let i = 0; i < data.length; i++) {
      allTweets.push(data[i].tweetText)
    }
    let arrayLength = allTweets.length
    let index = Math.floor(Math.random() * arrayLength + 1)
    console.log('index: ', index)
    let tweet = {
      status: allTweets[index]
    }

    T.post('statuses/update', tweet, getTweeted)

    function getTweeted(err, data, response) {
      if(err) {
        console.log("Something went wrong!")
      } else {
        console.log("It works!")
      }
    }
  })
}

const stream = T.stream('user')
stream.on('tweet', addToDatabase)

function addToDatabase(event) {
  if(event.user.screen_name === 'beyonce') {
    const message = event.text
    db.addTweet(message)
    console.log('tweet added to the database: ', message)
  }
}

router.get('/', function(request, response, next) {
  db.getAllTweets()
  .then(data => {
    response.render('index', {
      title: 'What\'s up',
      tweets: data
    })
  })
})

module.exports = router
