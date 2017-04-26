DROP DATABASE IF EXISTS twitterBot;
CREATE DATABASE twitterBot;

DROP TABLE IF EXISTS tweet;
CREATE TABLE tweet(
  id SERIAL PRIMARY KEY,
  tweetText VARCHAR(140)
);

INSERT INTO tweet(tweetText) VALUES('Here I am everyone');