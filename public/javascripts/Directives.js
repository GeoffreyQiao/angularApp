/**
 * Created by Geo on 2016/4/17.
 */

app
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
