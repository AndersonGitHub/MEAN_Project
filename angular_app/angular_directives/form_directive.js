angular.module('angular_app').directive('myForm', function () {
  return {    
    restrict: 'E',
    replace: 'true',
    templateUrl: "/angular_app/angular_partials/form.html"
  };
});