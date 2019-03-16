const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var twit = require('twitter');
require('dotenv').config({path: './datas.env'});
var sun1; 
var bandCond;

var client = new twit ({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

  var params = {q: 'solar sfi @bandconditions', count: 1, result_type: 'recent'};
      client.get('search/tweets', params, function(error, tweets, response) {
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
    }
  });

  var params2 = {q: 'hf band Day/Night @bandconditions', count: 1};
  client.get('search/tweets', params2, function(error, tweets1, response) {
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
    };      
  });
express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/bandCond', (req, res) => {
    
      
      /*var params = {q: 'solar sfi @bandconditions', count: 1, result_type: 'recent'};
      client.get('search/tweets', params, function(error, tweets, response) {
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
   
      sun1 = JSON.parse(data8);*/
  
     res.render('bandData.ejs',  {SFI: sun1.SFI, K: sun1.K, A: sun1.A, Sunspots: sun1.Sunspots, eighty: bandCond.eight, thirty: bandCond.thirty, seventeen: bandCond.seventeen, twelve: bandCond.twelveTen});
   // }      
  })
  
  /*var params2 = {q: 'hf band Day/Night @bandconditions', count: 1};
  client.get('search/tweets', params2, function(error, tweets1, response) {
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
    };      
  });
  })*/
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
