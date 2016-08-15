/**
 * Created by Kamil on 2016-08-06.
 */
'use strict';

var path = '';

angular.module('RESTService', [])
  .controller('NewsController', function ($scope, NewsModel) {
    var newsdashboard = this;
    var comm = this;

    function getNews() {
      path = 'getNews/';
      NewsModel.all().then(function (result) {
        newsdashboard.news = result.data;
        console.log("getNews: " + newsdashboard.news);
      })
    }

    newsdashboard.news = [];
    getNews();
    function createNews(news) {
      var date = new Date().toLocaleString();
      NewsModel.create(angular.extend({},
        {date: date}, news)).then(function (result) {
        initCreateForm();
        newsdashboard.news = result.data;
        $scope.showData = true;
        $scope.resultMessage = result.data;
        console.log("Info: " + newsdashboard.news.message);

        if (newsdashboard.news.message == "Error") {
          $scope.showData = true;
        } else {
          $scope.showData = false;
          $scope.showOk = true;
        }
      })
    }

    function initCreateForm() {
      comm.newComm = {title: '', text: '', author: ''};
    }

    newsdashboard.createNews = createNews;
  })
  .controller('NewsDisplayController',
    function ($scope, $routeParams, NewsModel) {
      // var displaydash = this;
      var newsId = $routeParams.id;

      path = 'getNewsById/' + newsId;
      NewsModel.getNewsById().then(function (result) {
        // displaydash.news = result.data;
        $scope.news = result.data;
        console.log("getNewsById: " + result.data);
      })

    })
  .controller('CommentController',
    function ($scope, $routeParams, NewsModel) {

      var newsId = $routeParams.id;
      path = 'getCommentsByNewsId/' + newsId;

      var comm = this;

      $scope.createComm = function (comment) {
        console.log("Tworze komentarz");
        var date = new Date().toLocaleString();
        console.log("Tworze date" + date);
        NewsModel.createComment(angular.extend({},
          {date: date, newsId: newsId}, comment)).then(function (result) {
          initCreateComm();
          $scope.getComments();
        })
      }
      function initCreateComm() {
        comm.newComm = {comment: '', author: ''};
      }

      $scope.getComments = function () {
        NewsModel.getCommentByNewsId().then(function (result) {
          $scope.comments = result.data;
          console.log("getCommentById: " + $scope.comments);
        });
      };
      $scope.getComments();
    })
  .constant('ENDPOINT_URI', 'http://192.168.0.3:8080/api/news/')
  .service('NewsModel', function ($http, ENDPOINT_URI) {
    var service = this;

    function getUrl() {
      return ENDPOINT_URI + path;
    }

    service.all = function () {
      return $http.get(getUrl());
    }

    service.getNewsById = function () {
      return $http.get(getUrl());
    }
    service.create = function (news) {
      return $http.post(getUrl(), news);
    }
    service.getCommentByNewsId = function () {
      return $http.get(getUrl());
    }
    service.createComment = function (comment) {
      return $http.post(getUrl(), comment);
    }
  })
;
