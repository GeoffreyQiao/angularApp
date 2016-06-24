/**
 * Created by Geo on 2016/4/21.
 */
var express = require('express');
var router  = express.Router();
/**
 * 经过此api的任何结果都返回为json格式；
 */
router.use(function(req, res, next)
           {
             res.header('Content-Type', 'Application/json');
             next();
           });

router.get('/product/:id/:name/:price', function(req, res)
{
  var query  = req.params;
  var item   = {};
  item.id    = query.id;
  item.name  = query.name;
  item.price = query.price;
  res.send(item);
});
router.get('/product', function(req, res)
{
  res.send('["apple", "茄子"]');
});

module.exports = router;
