const databaseName = 'twitterBot'
const pgPromise = require('pg-promise')
const pgp = pgPromise()
const connectionString = process.env.DATABASE_URL || `postgres://${process.env.USER}@localhost:5432/${databaseName}`
const database = pgp(connectionString)

const getAllTweets = () => {
  return database.any(`SELECT * FROM tweet`)
}

const getTweet = () => {
  return database.one(`SELECT * FROM tweet WHERE id=$1`)
}

const addTweet = (tweetText) => {
  return database.any(`INSERT INTO tweet (tweetText)
    VALUES ($1)`, [tweetText]
  )
}

module.exports = {
  getAllTweets,
  getTweet,
  addTweet
}