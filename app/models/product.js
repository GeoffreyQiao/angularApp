/**
 * Created by Geo on 2016/4/4.
 */

//引入mongoose模块
var mongoose = require('mongoose');
var dbConfig = require('../../configs/db');


// 建立数据库连接
var db = mongoose.createConnection(dbConfig.host, dbConfig.dbName);

// 打印数据库连接错误信息
db.on('error', function(err, next)
{
  console.log(err);
  return next(err);
});

exports.db = db;
/**
 * @interface {productsSchema}
// */
var productsSchema = new mongoose.Schema({
  P_barcode     : String,
  P_brand       : String,
  P_name        : String,
  P_py          : String,
  P_mainUnit    : String,
  P_unitChange  : Number,
  P_helpUnit    : String,
  P_price       : Number,
  P_helpBarcode : String,
  P_helpPrice   : Number,
  P_price_main  : Number,
  P_price_help  : Number,
  P_haveYet     : Number,
  P_addDate     : {
    type    : Date,
    default : Date.now()
  }
});

exports.ProductModel = db.model('Product', productsSchema);
