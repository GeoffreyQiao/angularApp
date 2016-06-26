/**
 * Created by Geo on 2016/6/24.
 */

app.factory('AjaxService', ["$q", "$http", function($q, $http)
  {
    return {

      /**
       * GET请求
       * @param optionsObj
       * @returns {promise|any|Promise<T>}
       */
      get  : function(optionsObj)
        {
          var deferred = $q.defer();
          var promise = deferred.promise;
          var dataStr = '';

          if(optionsObj.data)
            {
              for(key in optionsObj.data)
                {
                  dataStr += key + "=" + optionsObj.data[key] + "&";
                }
              optionsObj.url += "?" + dataStr;
            }
          $http.get(optionsObj.url)
               .success(function(data)
                        {
                          deferred.resolve(data);
                        })
               .error(function(error)
                      {
                        deferred.reject(error);
                      });
          return promise;
        },

      /**
       * POST请求
       * @param optionsObj
       * @returns {promise|any|Promise<T>}
       */
      post : function(optionsObj)
        {
          var deferred = $q.defer();
          var promise = deferred.promise;

          $http.post(optionsObj.url, optionsObj.data)
               .success(function(data)
                        {
                          deferred.resolve(data);
                        })
               .error(function(error)
                      {
                        deferred.reject(error);
                      });
          return promise;
        }
    }
  }]);
