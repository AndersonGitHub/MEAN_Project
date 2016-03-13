angular.module('angular_app').factory('document_ajax_service', function ($http) {
  var DOC_REST_URL = 'http://localhost:5000/doc/';

  return {
    createDoc: createDoc,
    readDoc: readDoc,
    updateDoc: updateDoc,
    deleteDoc: deleteDoc
  }
      
  function createDoc(new_doc, callback) {
    $http.post(DOC_REST_URL, new_doc).then(
      function successCallback(response) {
        callback();
        return response.data;
      }, function errorCallback(response) {
        return response.status;
      });
  };

  function readDoc(callback) {
    $http.get(DOC_REST_URL).then(
      function successCallback(response) {
        callback(response.data);
      }, function errorCallback(response) {
        return response.status;
      });
  };

  function updateDoc(doc_update, callback) {
    $http.put(DOC_REST_URL, doc_update).success(
      function (response) {
        callback();
        return response.status;
      }).error(function (response) {
        return response.status;
      });
  };

  function deleteDoc(document_id, callback) {
    $http.delete(DOC_REST_URL + document_id).success(
      function (response) {
        callback();
        return response.status;
      }).error(function (response) {
        return response.status;
      });
  };

});