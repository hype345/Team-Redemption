const express = require('express')
const bodyParser= require('body-parser')
const app = express()

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({limit: '50mb' , parameterLimit:50000, extended: true}))

app.set('view engine', 'ejs')

//app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'))

app.use(express.json({limit: '50mb'}));

app.use(bodyParser.json({limit: '50mb'}))

const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect("mongodb+srv://Chase:123@cluster0-o2g0q.mongodb.net/test?retryWrites=true&w=majority", (err, client) => {
  if (err) return console.log(err)
  db = client.db('Cluster0') // whatever your database name is
  
  app.listen(process.env.PORT || 3000, () => {
    console.log('listening on 3000')
  })


  app.post('/kids', (req, res) => {
  db.collection('kids').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})


  app.get('/', (req, res) => {
    db.collection('kids').find().toArray((err, result) => {
      if (err) return console.log(err)
      // renders index.ejs
      res.render('index.ejs', {database: result})
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

if(req.body.age.length >= 1)
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
  
})

