var express = require('express');
var validator = require('validator');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(express.static(path.join(__dirname, '../')));

app.use(bodyParser.urlencoded({
  extended: true
  }));
  
app.use(bodyParser.json());

var port = 5000;
app.listen(port, function () {  
  console.log("Application listening on port " + port);
});

//mongoose
var mongoose = require('mongoose');
var db_string = 'mongodb://127.0.0.1/test';
mongoose.connect(db_string);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error.'));

var DocumentModel = undefined;

db.once('open', function () {  
  var document_schema = mongoose.Schema({
    attribute_1: String,
    attribute_2: String,
    attribute_3: String
  });

  DocumentModel = mongoose.model('DocumentModel', document_schema);  
 });
 
 
function list_documents(callback) {
  DocumentModel.find({}, function (error, docs) {
    if (error) {
      callback({ error: 'error...' });
    } else {
      callback(docs);
    }
  });
};

function get_one_dodument(id, callback) {
  DocumentModel.findById(id, function (error, doc) {
    if (error) {
      callback({ error: 'error...' });
    } else {
      callback(doc);
    }
  });
};

function save_document(new_doc, callback) {
  new DocumentModel({    
    attribute_1: new_doc.attribute_1,
    attribute_2: new_doc.attribute_2,
    attribute_3: new_doc.attribute_3    
  }).save(function (error, doc) {
    if (error) {
      callback({ error: 'error...' });
    } else {
      callback(doc);
    }
  });
};

function update_document(doc_update, callback) {  
  DocumentModel.findById(doc_update._id, function (err, doc) {    
    if (Boolean(doc_update.attribute_1)) {doc.attribute_1 = doc_update.attribute_1;}
    if (Boolean(doc_update.attribute_2)) {doc.attribute_2 = doc_update.attribute_2;}
    if (Boolean(doc_update.attribute_3)) {doc.attribute_3 = doc_update.attribute_3;}    
    doc.save(function (error, doc) {
      if (error) {
        callback({ error: 'error...' });
      } else {
        callback(doc);
      }
    });

  });
};

function delete_document(id, callback) {
  DocumentModel.findById(id, function (error, doc) {
    if (error) {
      callback({ error: 'error...' });
    } else {
      doc.remove(function (error) {
        if (!error) {
          callback({ response: 'success on remove' });
        }
      });
    }
  });
};
 
 
//REST API 
app.get('/doc/', function (req, res) {  
  list_documents(
    function(resp) {      
      res.json(resp);
      }
  );  
});

app.get('/doc/:id', function (req, res) {
  var id = validator.trim(validator.escape(req.param('id')));
  get_one_dodument(id, function(err, resp) {
    if(err) res.send(err);
    res.json(resp);
    });
});

app.post('/doc/', function (req, res) {
  var new_doc = {    
    attribute_1 : validator.trim(validator.escape(req.body.attribute_1)),
    attribute_2 : validator.trim(validator.escape(req.body.attribute_2)),
    attribute_3 : validator.trim(validator.escape(req.body.attribute_3))        
  };
  save_document(new_doc, function(err, resp) {
    if(err) res.send(err);
    res.json(resp);}
    );
    });
    
app.put('/doc/', function(req, res) {
  var doc_update = {
    _id : validator.trim(validator.escape(req.body._id)),
    attribute_1 : validator.trim(validator.escape(req.body.attribute_1)),
    attribute_2 : validator.trim(validator.escape(req.body.attribute_2)),
    attribute_3 : validator.trim(validator.escape(req.body.attribute_3))    
  };  	  
	update_document(doc_update, function(resp) {
	 	res.json(resp);
	 });
});

app.delete('/doc/:id', function (req, res) {  
  var id = validator.trim(validator.escape(req.param('id')));
  delete_document(id, function(err, resp) {
    if(err) res.send(err);
		res.json(resp);
    });
});