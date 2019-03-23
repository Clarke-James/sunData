const express = require('express')
const path = require('path')
var bodyParser = require('body-parser');
var router = express.Router();
const PORT = process.env.PORT || 5000
var fs = require('fs');
var getTweet = require("./bandCond");

var sun1;
var bandCond;

//getTweet.getSun();
getTweet.getBands();
//getTweet.get10Tweets(searchData);

//Used this from https://www.tutorialkart.com/nodejs/node-js-try-catch/ to get json files
try{
  fs.readFile('outputSun.json',
      // callback function
      function(err, data) { 
          if (err) throw err;
          sun1 = JSON.parse(data);
  });
} catch(err){
  console.log("In Catch Block")
  console.log(err);
} 

try{
  fs.readFile('outputBands.json',
      // callback function
      function(err, data) { 
          if (err) throw err;
          bandCond = JSON.parse(data);
  });
} catch(err){
  console.log("In Catch Block")
  console.log(err);
} 

var searchData;

express()

  .use(express.static(path.join(__dirname, 'public')))
  .use(express.json())
  .use(express.urlencoded({extended: true}))
  .use(bodyParser.urlencoded({ extended: true }))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/bandData', (req, res ) => {
    res.render('bandData',  {SFI: sun1.SFI, K: sun1.K, A: sun1.A, Sunspots: sun1.Sunspots, eighty: bandCond.eight, thirty: bandCond.thirty, seventeen: bandCond.seventeen, twelve: bandCond.twelveTen});
})
  .get('/sunData', (req, res ) => {
        res.render('sunData',  {SFI: sun1.SFI, K: sun1.K, A: sun1.A, Sunspots: sun1.Sunspots, eighty: bandCond.eight, thirty: bandCond.thirty, seventeen: bandCond.seventeen, twelve: bandCond.twelveTen});
  })
  .get('/search', function (req, res){
    searchData = req.query.data;
    getTweet.getTweet(searchData, function (data){
     res.send(data);
     //console.log(data);
    });
    //console.log(searchData);
  })
 



  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
  