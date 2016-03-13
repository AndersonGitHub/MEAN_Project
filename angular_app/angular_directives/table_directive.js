angular.module('angular_app').directive('myTable', function () {
  return {    
    restrict: 'E',
    replace: 'true',
    templateUrl: "/angular_app/angular_partials/table.html"
  };
});