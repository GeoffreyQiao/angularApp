/**
 * Created by Geo on 2016/4/13.
 */
var express = require('express');
var router  = express.Router();
var mongo   = require('../models/product');

var db = mongo.db;

router.post('/add', function(req, res)
{
  var product = req.body;
  addProduct(product, function(info)
  {
    if(info)
    {
      res.json('success');
    }else
    {
      res.json('failed');
    }
  })
});

router.get('/list', function(req, res)
{
  getProductsList(function(product)
                  {
                    res.json(product);
                  })
});

router.get('/del/:id', function(req, res)
{
  var productId = req.params.id;
  console.log(req.params);
  removeProduct(productId, function(info)
  {
    res.json(info);
  })
});

router.get('/search/:key/:value', function(req, res)
{
  var searchObj = {};
  searchObj['P_' + (req.params.key).toLowerCase()] = req.params.value;
  if(searchObj.P_name)
  {
    searchObj.P_name = new RegExp(searchObj.P_name);
  }
  searchProduct(searchObj, function(products)
  {
    res.json(products);
  })
});

module.exports = router;

/**
 * @description 获取数据库中的商品信息
 * @param callback
 */
var getProductsList = function(callback)
  {
  /**
   * @description 获取所有商品的数量,并执行callback
   */
  mongo.ProductModel.find({}, function(err, products, next)
  {
    if(err)
    {
      console.log(err);
    }
    callback && callback(products);
  })
  };

/**
 * 新增商品
 * TODO 需要完善验证功能
 * @param productData
 * @param callback
 */
var addProduct = function(productData, callback)
{
  mongo.ProductModel.create(productData, function(err, product)
  {
    if(err) return console.log(err);
    if(product)
    {
      callback(true);
    }
    db.close();
  });
};

/**
 * 删除指定ID的商品项目
 * @param productId
 * @param callback
 */
var removeProduct = function(productId, callback)
{
  mongo.ProductModel.remove({_id : productId}, function(err)
  {
    if(err) return console.log(err);
    callback('success');
    db.close();
  })
};

/**
 * 按照不同条件搜索商品
 * @param productObj
 * @param callback
 */
var searchProduct = function(productObj, callback)
{

  mongo.ProductModel.find(productObj, function(err, products)
  {
    if(err) return console.log(err);
    callback && callback(products);
  })
};
