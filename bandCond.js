var express = require('express');
var twit = require('twitter');
var fs = require('fs');
require('dotenv').config({path: './datas.env'});

module.exports.getSun = getSun;
module.exports.getBands = getBands;
module.exports.getTweet = getTweet;

var sun1;
var bandCond;

var client = new twit ({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });
  
//getSun();
//getBands();

function getSun(){
  var params = {q: 'solar sfi @bandconditions', count: 1};
client.get('search/tweets', params, function (error, tweets, response)  {
    if (!error) {
      var sun = tweets.statuses[0].text;
      var data = sun.replace("RT @bandconditions: Solar\n", "{ ");
      var data1 = data.replace("#hamradio", "");
      var data2 = data1.replace("#hamr", "");
      var data3 = data2.replace(/\n/g, ", ");
      var data4 = data3.replace(",   ", " }");
      var data5 = data4.replace("SFI:", "\"SFI\":");
      var data6 = data5.replace("A:", "\"A\":");
      var data7 = data6.replace("K:", "\"K\":");
      var data8 = data7.replace("Sunspots:", "\"Sunspots\":");
   
      sun1 = JSON.parse(data8);
      //console.log(sun1)   
      //return sun1; 

      //https://www.tutorialkart.com/nodejs/node-js-write-json-object-to-file/
var jsonContent = JSON.stringify(sun1);
//console.log(jsonContent);
 
fs.writeFile("outputSun.json", jsonContent, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Sun Object to File.");
        return console.log(err);
    }
 
   // console.log("JSON Sun file has been saved.");
}); 

        };
        
    });
}


function getBands(){
  var params = {q: 'hf band Day/Night @bandconditions', count: 1};
client.get('search/tweets', params, function (error, tweets1, response) {
    if (!error) {
      var bands= tweets1.statuses[0].text;
      var band1 = bands.replace(/\n/g, " ");
      var band2 = band1.replace("RT @bandconditions: HF Band Day/Night", "{ ");
      var band3 = band2.replace(" #hamradio #hamr", "\"}");
      var band4 = band3.replace(" 80m-40m", "\"eight\": \"");
      var band5 = band4.replace("30m-20m", "\", \"thirty\": \"");
      var band6 = band5.replace("17m-15m", "\", \"seventeen\": \"");
      var band7 = band6.replace("12m-10m", "\", \"twelveTen\": \"");

     bandCond = JSON.parse(band7);
       //console.log(bandCond)
      //return bandCond;
      
//https://www.tutorialkart.com/nodejs/node-js-write-json-object-to-file/
var jsonContent1 = JSON.stringify(bandCond);
//console.log(jsonContent1);
 
fs.writeFile("outputBands.json", jsonContent1, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Bands Object to File.");
        return console.log(err);
    }
 
   // console.log("JSON Bands file has been saved.");
}); 
    };      
  });
}




//https://codeburst.io/build-a-simple-twitter-bot-with-node-js-in-just-38-lines-of-code-ed92db9eb078
function getTweet(searchData, callback){

// Set up your search parameters
var params = {
  q: searchData,
  count: 1,
  result_type: 'recent',
  lang: 'en',
}

// Initiate your search using the above paramaters
client.get('search/tweets', params, function(err, data, response) {
//var tweets = [];

  // If there is no error, proceed
  if(!err){
    // Loop through the returned tweets
    for(let i = 0; i < data.statuses.length; i++){
      // Get the tweet Id from the returned data
      let id = { id: data.statuses[i].id_str }
      // Try to Favorite the selected Tweet
      //var tweet;
      client.post('favorites/create', id, function(err, response){
        // If the favorite fails, log the error message
        if(err){
          let username = response.user.screen_name;
          let tweetId = response.id_str;
          let tweetText = response.text;
          //console.log('Tweets: ', `https://twitter.com/${username}/status/${tweetId}`);
          return callback({'Tweets':  `https://twitter.com/${username}/status/${tweetId}`, 'tweetText': tweetText, 'userName': username});
          
         //console.log(err[0].message);
      }
        // If the favorite is successful, log the url of the tweet
        else{
          let username = response.user.screen_name;
          let tweetId = response.id_str;
          let tweetText = response.text;
          //console.log('Tweets: ', `https://twitter.com/${username}/status/${tweetId}`);
          return callback({'Tweets':  `https://twitter.com/${username}/status/${tweetId}`, 'tweetText': tweetText, 'userName': username});
          //tweet = ({'userName': username, 'tweetId': tweetId, 'tweetText': tweetText});
          //tweets.push(tweet);
        }
      });
      
    }
    //return callback(tweets);
  } else {
    console.log(err);
}
      })
}