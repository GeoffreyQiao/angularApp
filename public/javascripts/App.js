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
                     controller  : 'AddProductCtrl'
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

app.service('productModel', function(data)
{
  var pModel = function()
  {
    var self = this;
    data.forEach(function(value, key)
                 {
                   if(value || value === false)
                   {
                     self.info[key] = value;
                   }
                 });

    /**
     *
     * @type {{P_name: string, P_barCode: string, P_brand: string, P_shortName: string, P_unitMain: string, P_spec: string, P_category: string, P_isUseHelpUnit: boolean, P_quantityAtStart: number, P_costPrice: number, P_sellingPrice: number, P_unitHelp: string, P_timesForMainUnit: number, P_unitHelp_barCode: string, P_unitHelp_price: number, P_isSelling: boolean, P_addDate: Date}}
     */
    this.info = {
      P_name             : '',
      P_barCode          : '',
      P_brand            : '',
      P_shortName        : '',
      P_unitMain         : '',
      P_spec             : '',
      P_category         : '',
      P_isUseHelpUnit    : false,
      P_quantityAtStart  : 0,
      P_costPrice        : 0.0,
      P_sellingPrice     : 0.0,
      P_unitHelp         : '',
      P_timesForMainUnit : 1,
      P_unitHelp_barCode : '',
      P_unitHelp_price   : 0.0,
      P_isSelling        : true,
      P_addDate          : +new Date()
    };

    /**
     *
     * @returns {Object}
     */
    this.validator = function()
    {
      var data = this.info;
      if(data.P_name && data.P_barCode && data.P_unitMain && data.P_category && data.P_costPrice && data.P_sellingPrice)
      {
        if(data.P_name.length && data.P_barCode.length == 13 && data.P_unitMain.length)
        {
          if(data.P_costPrice < data.P_sellingPrice)
          {
            if(data.P_isUseHelpUnit)
            {
              if(data.P_unitHelp && (data.P_unitHelp_barCode.length == 13) && data.P_unitHelp_price && (data.P_timesForMainUnit > 1)) return data;
              return new Error('您已启用辅助单位， 请指明该商品辅助单位所对应的条码，，单价，与该商品主单位级别的比例以及辅助单位的名称！');
            }
            return data;
          }
          return new Error('为了您的利益，商品的售价应该高于进价！');
        }
        return new Error('商品的名称，13位条形码以及计价单位为必填项！');
      }
      return new Error('请检查商品属性是否正确填写!');
    };
  };

  return new pModel()
});
