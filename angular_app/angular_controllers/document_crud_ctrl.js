angular.module('angular_app', []).controller('document_crud_ctrl', function ($scope, document_ajax_service) {
  $scope.message = 'Hello World!';

  $scope.docs = [];
  $scope.selected_order = "";
  $scope.filter = "";
  $scope.checked = -1;
  $scope.order = function (order) {
    $scope.selected_order = order;
  };
  $scope.change_index = function (index) {
    if ($scope.checked == index) {
      $scope.checked = -1;
    } else {
      $scope.checked = index;
    }
  };

  
  //$scope.document = {};

  $scope.list_docs = function() {
    document_ajax_service.readDoc(function (data) {
      $scope.docs.length = 0;
      $scope.docs = angular.fromJson(data);
    });
  };
  
  $scope.list_docs();

  $scope.insert_doc = function (document) {
    var new_doc = {
      attribute_1: document.attribute_1,
      attribute_2: document.attribute_2,
      attribute_3: document.attribute_3
    };
    document_ajax_service.createDoc(new_doc, function () {
      delete $scope.document;
      $scope.list_docs();
    });
  };

  $scope.update_doc = function (document) {        
    document_ajax_service.updateDoc(angular.copy(document), function () {
      $scope.list_docs();
    });
  };

  $scope.delete_doc = function (id) {
    document_ajax_service.deleteDoc(id, function () {
      $scope.list_docs();
    });
  };


});