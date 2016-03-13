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

  function list_docs() {
    document_ajax_service.readDoc(function (data) {
      $scope.docs.length = 0;
      $scope.docs = data;
    });
  };
  
  list_docs();  

  $scope.insert_doc = function () {
    var new_doc = {
      attribute_1: angular.copy($scope.document.attribute_1),
      attribute_2: angular.copy($scope.document.attribute_2),
      attribute_3: angular.copy($scope.document.attribute_3)      
    };
    document_ajax_service.createDoc(new_doc, function () {
      list_docs();
      delete $scope.document;
    });
  };

  $scope.update_doc = function (document) {        
    document_ajax_service.updateDoc(angular.copy(document), function () {
      list_docs();
    });
  };

  $scope.delete_doc = function (id) {
    document_ajax_service.deleteDoc(id, function () {
      list_docs();
    });
  };


});