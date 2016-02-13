'use strict';

var app = angular.module('someApp');

app.controller('navCtrl', ['$scope', '$http', function($scope, $http) {

  $scope.logout = function(){
  console.log('navCtrl');
  	$http.post('/users/logout')
  }
}]);
