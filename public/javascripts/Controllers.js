/**
 * Created by Geo on 2016/4/17.
 */

/**
 * 主控制器
 */
app.controller('AppCtrl', ['$scope',
                           function($scope)
                             {
                               /**
                                *
                                * @type {*[]}
                                */
                               $scope.menuList = [
                                 {
                                   text : '个人设置',
                                   href : 'options'
                                 },
                                 {
                                   text : '基础数据',
                                   href : 'baseData'
                                 }
                               ];
                               $scope.title = 'Geo 商品管理';
                             }
   ])

   .controller('IndexCtrl', ['$scope',
                             function($scope)
                               {
                                 /**
                                  *
                                  * @type {*[]}
                                  */
                                 $scope.sideBar = {
                                   sideTitle : '参考报表',
                                   sideList  : [
                                     {
                                       text : '首页',
                                       href : 'options'
                                     },
                                     {
                                       text : '功能',
                                       href : 'baseData'
                                     }
                                   ]
                                 };
                                 $scope.title = 'Geo 商品管理';
                               }
   ])

   .controller('ProductCtrl', ['$scope', '$state',
                               function($scope, $state)
                                 {
                                   $scope.sideBar = {
                                     sideTitle : '商品管理',
                                     sideList  : [
                                       {
                                         text : '商品列表',
                                         href : 'product.list'
                                       },
                                       {
                                         text : '新增商品',
                                         href : 'product.add'
                                       },
                                       {
                                         text : '1',
                                         href : '2List'
                                       }
                                     ]
                                   };
                                   $state.go('product.default');
                                 }])

   /**
    * 商品列表控制器
    */
   .controller('ProductListCtrl', ['$scope', '$http',
                                   function($scope, $http)
                                     {
                                       $scope.products = [];
                                       $scope.moonSun = true;
                                       $scope.test = 'PListCtrl';
                                       $scope.searchText = '';
                                       $scope.sideList = [
                                         {
                                           text : '新增商品',
                                           href : 'addProduct'
                                         },
                                         {
                                           text : '商品列表',
                                           href : 'productList'
                                         },
                                         {
                                           text : '1',
                                           href : '2List'
                                         }
                                       ];

                                       /**
                                        * @description 商品列表视图中每个商品的当页编号，1位数时用0补足2位，并可指定不超过2个字符的前缀符号
                                        * @param indexNo
                                        * @param symbol        前缀符号
                                        * @returns {string|*}
                                        */
                                       $scope.getIndexNo = function(indexNo, symbol)
                                         {
                                           this.outNo = '';
                                           if(symbol !== undefined && symbol.length < 3) this.outNo = symbol;

                                           this.outNo += indexNo < 9 ? "0" + (indexNo + 1) : indexNo + 1;
                                           return this.outNo;
                                         };

                                       /**
                                        * @description 获取商品全部商品列表
                                        */
                                       $scope.getList = function()
                                         {
                                           $http({
                                                   method : 'GET',
                                                   url    : 'http://127.0.0.1/product/list'
                                                 })
                                           /**
                                            * 当返回结果为 success 且结果数据的长度大于等于1时，保存结果到控制器的 $scope.products 属性中
                                            */
                                             .success(function(data)
                                                      {
                                                        if(data.length >= 1)
                                                          {
                                                            $scope.products = data;
                                                          }else
                                                          {
                                                            $scope.products = [];
                                                          }
                                                      });
                                         };

                                       /**
                                        * 从列表中删除（从视图中删除）指定 ID 的商品
                                        * @param itemID
                                        */
                                       $scope.deleteProductById = function(itemID)
                                         {
                                           $http({
                                                   method : 'GET',
                                                   url    : 'http://127.0.0.1/product/del/' + itemID
                                                 })
                                             .success(function(data)
                                                      {
                                                        console.log(data);
                                                        if(data == 'success')
                                                          {
                                                            $scope
                                                              .products
                                                              .forEach(function(item, index, productsList)
                                                                       {
                                                                         if(item._id == itemID)
                                                                           {
                                                                             productsList.splice(index, 1);
                                                                           }
                                                                       }
                                                              );
                                                            return $scope.result = '成功删除商品';
                                                          }
                                                        return $scope.result = '删除商品失败';
                                                      }
                                             )
                                         };

                                       $scope.editProductById = function(itemID)
                                         {

                                         };

                                       $scope.findProduct = function()
                                         {
                                           var text = $scope.searchText;
                                           var searched = {};
                                           var regBarCode = new RegExp('^[0-9]{13}$');
                                           var regSuo = new RegExp('^[a-zA-Z]+$');
                                           var regName = new RegExp('.+');

                                           if(!text)
                                             {
                                               $scope.getList();
                                               return false;
                                             }

                                           if(regBarCode.test(text))
                                             {
                                               searched = {
                                                 key   : 'barCode',
                                                 value : text
                                               }
                                             }else if(regSuo.test(text))
                                             {
                                               searched = {
                                                 key   : 'py',
                                                 value : text.toLowerCase()
                                               }
                                             }else if(regName.test(text))
                                             {
                                               searched = {
                                                 key   : 'name',
                                                 value : text
                                               }
                                             }
                                           if(searched.key && searched.value)
                                             {
                                               $http({
                                                       method : 'GET',
                                                       url    : 'http://127.0.0.1/product/search/' + searched.key + '/' + searched.value
                                                     })
                                                 .success(function(data)
                                                          {
                                                            $scope.products = data;
                                                          })
                                             }
                                         }
                                     }
   ])

   .controller('AddProductCtrl', ['$scope', '$http', 'AjaxService',

                                  /**
                                   * 新增商品控制器
                                   * @param $scope
                                   * @param $http
                                   * @param AjaxService
                                   */
                                    function($scope, $http, AjaxService)
                                    {
                                      /**
                                       * 新增商品默认属性值
                                       * @type {{P_isUseHelpUnit: boolean}}
                                       */
                                      $scope.item = {
                                        P_isUseHelpUnit : true
                                      };

                                      $scope.add = function()
                                        {
                                          var dataObj = {
                                            url  : 'http://127.0.0.1/product/add',
                                            data : $scope.item
                                          };
                                          $scope.result='';
                                          AjaxService.post(dataObj)
                                                     .then(function(res)
                                                           {
                                                             if(res == 'success')
                                                               {
                                                                 $scope.item = {
                                                                   P_isUseHelpUnit : true
                                                                 };
                                                                 return $scope.result = '商品添加成功';
                                                               }else if(res == 'failed')
                                                               {
                                                                 return $scope.result = '商品添加失败';
                                                               }
                                                           },
                                                           function(error)
                                                           {
                                                             $scope.result = error;
                                                           });
                                        }
                                    }
   ]);
