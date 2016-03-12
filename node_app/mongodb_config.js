var db_string = 'mongodb://127.0.0.1/database_name';
var mongoose = require('mongoose').connect(db_string);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Falha de conexão com o MongoDB'));

db.once('open', function () {
  var NewDocumentSchema = mongoose.Schema({
    //...attributes
  });

  exports.NewDocument = mongoose.model('NewDocument', NewDocumentSchema);
});