var db = require('../mongodb_config.js');

exports.list = function (callback) {
  db.NewDocument.find({}, function (error, docs) {
    if (error) {
      callback({ error: 'Nao foi possivel retornar registro.' });
    } else {
      callback(docs);
    }
  });
};

exports.get = function (id, callback) {
  db.NewDocument.findById(id, function (error, despesa) {
    if (error) {
      callback({ error: 'Nao foi possivel retornar registro.' });
    } else {
      callback(despesa);
    }
  });
};

exports.save = function (new_document, callback) {
  new db.NewDocument({    
    valor: formParameters.valor,
    descricao: formParameters.descricao,    
    data : formParameters.data
  }).save(function (error, despesa) {
    if (error) {
      callback({ error: 'Nao foi possivel salvar a despesa' });
    } else {
      callback(despesa);
    }
  });
};

exports.update = function (despesa_update, callback) {
  db.Despesa.findById(despesa_update.id, function (err, despesa) {    
    if (Boolean(despesa_update.descricao)) {despesa.descricao = despesa_update.descricao;}
    if (Boolean(despesa_update.data)) {despesa.data = despesa_update.data;}       
    
    despesa.save(function (error, despesa) {
      if (error) {
        callback({ error: 'Nao foi possivel atualizar a despesa.' });
      } else {
        callback(despesa);
      }
    });

  });
};

exports.delete = function (id, callback) {
  db.Despesa.findById(id, function (error, despesa) {
    if (error) {
      callback({ error: 'Nao foi possivel remover a despesa' });
    } else {
      despesa.remove(function (error) {
        if (!error) {
          callback({ response: 'Despesa excluída com sucesso' });
        }
      });
    }
  });
};