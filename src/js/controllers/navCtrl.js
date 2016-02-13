'use strict';

var app = angular.module('someApp');

app.controller('navCtrl', ['$scope', '$http', "$cookies", function($scope, $http, $cookies) {

  $scope.logout = function(){
  	$cookies.remove('mytoken')

var cookies = $cookies.getAll()
console.log(cookies)
  }
}]);
