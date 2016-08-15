'use strict';

/**
 * @ngdoc overview
 * @name newsClientApp
 * @description
 * # newsClientApp
 *
 * Main module of the application.
 */
angular
  .module('newsClientApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'RESTService'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'NewsController',
        controllerAs: 'newsdashboard'
      })
      .when('/displaynews/:id', {
        templateUrl: 'views/display.html',
        controller: 'NewsDisplayController',
        controllerAs: 'displaydash'
      })
      .when('/add', {
        templateUrl: 'views/add.html',
        controller: 'NewsController',
        controllerAs: 'newsdashboard'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
