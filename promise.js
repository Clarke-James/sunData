var express = require('express');
var twit = require('twitter');
var fs = require('fs');
require('dotenv').config({path: './datas.env'});

//module.exports.getSun = getSun;
//module.exports.getBands = getBands;
//module.exports.getTweet = getTweet;

var sun1;
var bandCond;

var client = new twit ({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });
  
getTweet;

function getTweet(){
    return new Promise(function (fulfill, reject){
      getSun( function (err, res){
        if (err) reject(err);
        else fulfill(res);
      });
    });
  }

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
        console.log(sun1)   
        //return sun1; 
  
        //https://www.tutorialkart.com/nodejs/node-js-write-json-object-to-file/
  var jsonContent = JSON.stringify(sun1);
  //console.log(jsonContent);
   
  //fs.writeFile("outputSun.json", jsonContent, 'utf8', function (err) {
      //if (err) {
      //    console.log("An error occured while writing JSON Sun Object to File.");
      //    return console.log(err);
      //}
   
     // console.log("JSON Sun file has been saved.");
 // }); 
  
          };
          
      });
  }
  