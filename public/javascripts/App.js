/**
 * @ngdoc application
 * @name app
 * @description
 * @requires ui.router
 * */
var app = angular.module('app', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider)
           {
             $stateProvider
               .state('content', {
                 url   : '/',
                 views : {
                   ''        : {
                     templateUrl : 'views/home.html',
                     controller  : 'IndexCtrl'
                   },
                   'sideBar' : {
                     templateUrl : 'views/side.list.html',
                     controller  : 'IndexCtrl'
                   }
                 }
               })

               .state('product', {
                 url   : '/product',
                 views : {
                   'sideBar' : {
                     templateUrl : 'views/side.list.html',
                     controller  : 'ProductCtrl'
                   },
                   ''        : {
                     templateUrl : 'views/product.html',
                     controller  : 'ProductCtrl'
                   }
                 }
               })
               .state('product.default', {
                 url         : '/',
                 templateUrl : 'views/product.default.html'
               })
               .state('product.list', {
                 url         : '/list',
                 templateUrl : 'views/product.list.html',
                 controller  : 'ProductListCtrl'
               })
               .state('product.add', {
                 url   : '/add',
                 views : {
                   '' : {
                     templateUrl : 'views/product.add.html',
                     controller  : 'ProductAddCtrl'
                   }
                 }
               })

               .state('order', {});
             $urlRouterProvider.otherwise('/');
           });

app.service('passData', function()
{
  this._data   = {};
  this.setData = function(name, value)
  {
    return this._data[name] = value;
  };
  this.getData = function(name)
  {
    if(this._data[name])
    {
      return this._data[name];
    }
    return false;
  }
});
