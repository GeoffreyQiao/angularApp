/**
 * Created by Geo on 2016/4/17.
 */

app
  /* 获取商品列表 */
  .directive('productsList', function()
  {
    return {
      restrict : 'A',
      link     : function(scope)
      {
        scope.getList();
      }
    }
  })

  /* 切换特效按钮 */
  .directive('switchButton', function()
  {
    return {
      restrict    : 'E',
      templateUrl : 'views/switch.button.html',
      scope       : {
        id   : '@',
        data : '='
      }
    }
  })

  /* 搜索栏 */
  .directive('searchBar', function()
  {
    return {
      restrict : 'A',

      link : function($scope, element, attrs)
      {
        element.on('change', function(event)
        {
          console.log($scope.findProduct);
          $scope.findProduct();
        })
      }
    }
  });
