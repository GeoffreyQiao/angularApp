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

exports.db         = db;
/**
 * @interface {productsSchema}
 // */
var productsSchema = new mongoose.Schema({
  P_barCode          : String,        //条码
  P_brand            : String,        //品牌
  P_name             : String,        //品名
  P_shortName        : String,        //商品名称简写
  P_category         : String,        //商品分类
  p_spec             : String,        //规格
  P_quantityAtStart  : Number,        //初始数量
  P_unitMain         : String,        //主单位
  P_costPrice        : Number,        //成本价
  P_sellingPrice     : Number,        //销售单价
  P_isUseHelpUnit    : Boolean,       //是否启用辅助单位

  P_unitHelp         : String,        //辅助单位
  P_timesForMainUnit : Number,        //主单位比例
  P_unitHelp_barCode : String,        //辅单位条码
  P_unitHelp_price   : Number,        //辅单位售价
  P_addDate          : {              //新增商品时间
    type    : Date,
    default : Date.now()
  }
});

exports.ProductModel = db.model('Product', productsSchema);
