'use strict';

var app = angular.module('someApp');

app.controller('sexyUserCtrl', ['$scope', "GetLoggedInUser",function($scope, GetLoggedInUser) {
  console.log('sexyUserCtrl');

  GetLoggedInUser.getLoggedInUser()


}]);
app.service('GetLoggedInUser', function($http){
	this.getLoggedInUser = function(){
		console.log("in getLoggedInUser")
		$http.get('user/logged')
		.then(function(userInfo){
			console.log('userinfo', userInfo)
		}  )
		
	}
})
