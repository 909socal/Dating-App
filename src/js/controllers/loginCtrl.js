'use strict';

var app = angular.module('someApp');

app.controller('loginCtrl', ["$scope", "$http", "$state",function($scope, $http,$state) {
  console.log('loginCtrl');
  	$scope.loginClick = function(){
	var email = $scope.logEmail
	var password = $scope.logPass
	console.log("what is", password, email)
  		$http.post('/users/login', {email: email, password: password})
  		.then($state.go('sexyUser'))
  	}
}]);
