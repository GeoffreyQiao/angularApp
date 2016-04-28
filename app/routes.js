//引入并定义product模型
var products = require('./routes/products');
var apis     = require('./routes/apis');

module.exports = function(app)
{
  //处理 angular 发出的 request
  app.get('/', function(req, res)
  {
//    res.redirect("/index.html");
    res.sendfile('./public/index.html');
  });

  app.use('/product', products);

  app.use('/api', apis);
};


