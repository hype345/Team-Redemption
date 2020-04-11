
const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  console.log('Request for home recieved');
  res.render('index');
});

router.get('/aboutus', (req, res) => {
  console.log('Request for about page recieved');
  res.render('aboutus');
});

router.get('/getinvolved', (req, res) => {
  console.log('Request for contact page recieved');
  res.render('getinvolved');
});

router.get('/ourmission', (req, res) => {
    console.log('Request for contact page recieved');
    res.render('ourmission');
  });

  router.get('/ourpeople', (req, res) => {
    console.log('Request for contact page recieved');
    var mongoUtil = require( './mongoUtil' );
    var db = mongoUtil.getDb();
    db.collection('kids').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('ourpeople', {database: result})
    })
  });

module.exports = router;