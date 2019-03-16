var twit = require('twitter');
require('dotenv').config({path: './datas.env'});
var util = require ('util')
var client = new twit ({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });


  var params = {q: 'solar sfi @bandconditions', count: 1, result_type: 'recent'};
  client.get('search/tweets', params, function(error, tweets, response) {
    if (!error) {
      console.log(tweets.statuses[0].text)
            
        };
    });

  var params = {q: 'hf band Day/Night @bandconditions', count: 1};
  client.get('search/tweets', params, function(error, tweets1, response) {
    if (!error) {
       console.log(tweets1)
    };      
  });