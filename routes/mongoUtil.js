
const MongoClient = require( 'mongodb' ).MongoClient;
const url = "mongodb+srv://Chase:123@cluster0-o2g0q.mongodb.net/test?retryWrites=true&w=majority";

var _db;

module.exports = {

  connectToServer: function( callback ) {
    MongoClient.connect( url,  { useNewUrlParser: true , useUnifiedTopology: true}, function( err, client ) {
      _db  = client.db('Cluster0');
      return callback( err );
    } );
  },

  getDb: function() {
    return _db;
  }
};