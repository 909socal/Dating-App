'use strict';

var app = angular.module('someApp');

app.controller('sexySearchCtrl', ['$scope', '$http',function($scope, $http) {
	$http.get('/users/all')
	.then(function(usersAll){
		console.log('usersAll', usersAll)
		$scope.users = usersAll
		console.log("users", $scope.users[1])
	})

  console.log('sexySearchCtrl');
}]);
