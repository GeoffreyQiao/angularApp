/**
 * Created by Geo on 2016/4/13.
 */

var express = require('express');
var router  = express.Router();
var mongo   = require('../models/product');

var db = mongo.db;
var ProductModel = mongo.ProductModel;

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
 * (获取商品列表) 
 * @param callback (处理数据库操作返回结果)
 */
var getProductsList = function(callback)
{
  ProductModel.find({},
    /**
     * (获取数据库中的商品信息)
     * 
     * @param err (错误信息)
     * @param products (商品结果信息)
     * @param next (数据处理中间件)
     */
    function(err, products)
    {
      if(err)
      {
        console.log(err);
      }
      console.log(products);
      callback && callback(products);
    })
};

/**
 * (新增商品)
 * 
 * @TODO 需要完善验证功能
 * @param productData (商品信息数据)
 * @param callback (返回请求结果)
 */
var addProduct = function(productData, callback)
{
  ProductModel.create(productData,
  
/**
 * (接收数据库返回结果)
 * 
 * @param err (错误信息)
 * @param product (数据库处理结果)
 * @returns (结束)
 */
  function(err, product)
  {
    if(err) return console.log(err);
    if(product)
    {
      return callback(true);
    }
  });
};

/**
 * (删除指定ID的商品项目)
 * 
 * @param productId (商品ID)
 * @param callback (处理操作结果)
 */
var removeProduct = function(productId, callback)
{
  mongo.ProductModel.remove({_id : productId},
  
/**
 * (处理数据库新增商品返回结果)
 * 
 * @param err (错误信息)
 * @returns (description)
 */
  function(err)
  {
    if(err){
      callback('failed');
      return console.log(err);
    }
    callback('success');
//    db.close();
  })
};

/**
 * (按照不同条件搜索商品)
 * 
 * @param callback (处理操作结果)
 * @param productObj (商品搜索条件)
 * @returns (description)
 */
var searchProduct = function(productObj, callback)
{
  mongo.ProductModel.find(productObj, function(err, products)
  {
    if(err) return console.log(err);
    callback && callback(products);
  })};
