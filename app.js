const express = require('express');
const bodyParser= require('body-parser') //just added
const path = require('path');
const routes = require('./routes/index.js');


const app = express();
// Set the default views directory to html folder
app.set('views', path.join(__dirname, 'html'));

// Set the folder for css & java scripts
app.use(express.static(path.join(__dirname,'css')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname, 'javascripts')));

app.use(bodyParser.urlencoded({limit: '50mb' , parameterLimit:50000, extended: true})) //just added
app.use(express.static('public'))
app.use(express.json({limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}))


// Set the view engine to ejs
app.set('view engine', 'ejs');







// const MongoClient = require('mongodb').MongoClient

var mongoUtil = require('./routes/mongoUtil.js');

mongoUtil.connectToServer( function( err, client ) {
  app.use('/', routes); 

  if (err) console.log(err);
  app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running at localhost:3000');
  });

  var db = mongoUtil.getDb();

  
  app.post('/kids', (req, res) => {
    db.collection('kids').save(req.body, (err, result) => {
      if (err) return console.log(err)
      console.log('saved to database')
      res.redirect('ourpeople')
    })
  })
  
  
    app.get('/', (req, res) => {
      db.collection('kids').find().toArray((err, result) => {
        if (err) return console.log(err)
        // renders index.ejs
        res.render('ourpeople', {database: result})
      })
    })
  
    app.put('/kids', (req, res) =>  {
  if(req.body.newName.length >= 1)
  {
    db.collection('kids')
    .findOneAndUpdate({name: req.body.name}, {
      $set: {
        name: req.body.newName
      }
    }, {
      sort: {_id: -1}
    },  (err) => {
      if (err) return res.send(err)
     })
  }
  
  if(req.body.quote.length >= 1)
  {
    db.collection('kids')
    .findOneAndUpdate({name: req.body.name}, {
      $set: {
        quote: req.body.quote
      }
    }, {
      sort: {_id: -1}
    },  (err) => {
      if (err) return res.send(err)
     })
  }
  
  if(req.body.age.toString().length >= 1)
  {
    db.collection('kids')
    .findOneAndUpdate({name: req.body.name}, {
      $set: {
        age: req.body.age
      }
    }, {
      sort: {_id: -1}
    },  (err) => {
      if (err) return res.send(err)
     })
  }
  
  if(req.body.base64.length >= 1)
  {
    db.collection('kids')
    .findOneAndUpdate({name: req.body.name}, {
      $set: {
        base64: req.body.base64
      }
    }, {
      sort: {_id: -1}
    },  (err) => {
      if (err) return res.send(err)
     })
  }
  
  res.send({message: 'All good'})
   
    })
  
    app.delete('/kids', (req, res) => {
      db.collection('kids').findOneAndDelete({name: req.body.name},
      (err, result) => {
        if (err) return res.send(500, err)
        res.send({message: 'A darth vadar quote got deleted'})
      })
    })
  
  
  
} );
