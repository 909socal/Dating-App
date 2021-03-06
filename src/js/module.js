'use strict';

var app = angular.module('someApp', ['ui.router', "ngCookies"]);

app.config(function($stateProvider, $urlRouterProvider ) {
  $stateProvider
    .state('home', { url: '/', templateUrl: '/partials/home.html', controller: 'homeCtrl' })
    .state('register', { url: '/register', templateUrl: '/partials/register.html', controller: 'regCtrl' })
    .state('login', { url: '/login', templateUrl: '/partials/login.html', controller: 'loginCtrl' })
    .state('sexySearch', { url: '/sexySearch', templateUrl: '/partials/sexySearch.html', controller: 'sexySearchCtrl' })
    .state('sexyUser', { url: '/sexyUser', templateUrl: '/partials/sexyUser.html', controller: 'sexyUserCtrl' })
    

  $urlRouterProvider.otherwise('/');
});
