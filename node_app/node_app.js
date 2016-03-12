var app = require('./node_app_config.js');
var validator = require('validator');

var new_doc_ctrl = require('./node_controllers/new_doc_ctrl.js'); 
    
app.get('/doc/', function (req, res) {  
  new_doc_ctrl.list(
    function(resp) {      
      res.json(resp);
      }
  );  
});

app.get('/doc/:id', function (req, res) {
  var id = validator.trim(validator.escape(req.param('id')));
  new_doc_ctrl.get(id, function(err, resp) {
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
  new_doc_ctrl.save(new_doc, function(err, resp) {
    if(err) res.send(err);
    res.json(resp);}
    );
    });
    
app.put('/doc/', function(req, res) {
  var doc_update = {    
    attribute_1 : validator.trim(validator.escape(req.body.attribute_1)),
    attribute_2 : validator.trim(validator.escape(req.body.attribute_2)),
    attribute_3 : validator.trim(validator.escape(req.body.attribute_3))    
  };
	  
	new_doc_ctrl.update(doc_update, function(resp) {
		res.json(resp);
	});
});

app.delete('/doc/:id', function (req, res) {  
  var id = validator.trim(validator.escape(req.param('id')));
  new_doc_ctrl.delete(id, function(err, resp) {
    if(err) res.send(err);
		res.json(resp);
    });
});