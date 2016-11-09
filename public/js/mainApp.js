var app = angular.module("mainApp",[]);

app.controller('MainCtrl', ['$scope', function($scope){
  $scope.message = 'World';
}]);
