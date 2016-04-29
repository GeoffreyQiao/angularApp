/**
 * Created by Geo on 2016/4/4.
 */


//模块 modules-----------------------------------------------------------
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var cookieParser   = require('cookie-parser');
var methodOverride = require('method-override');

//配置文件 config files----------------------------------------------------
var db = require('./configs/db');

//设置发布端口 setting port-------------------------------------------------
var port = process.env.PORT || 80;

//解析application/json数据 parse application/json data---------------------
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended : false}));

app.use(cookieParser());

//解析application/vnd.api+json 为 json格式----------------------------------
app.use(bodyParser.json({type : 'application/vnd.api+json'}));

//解析application/x-www-form-urlencoded-----------------------------------
app.use(bodyParser.urlencoded({extended : false}));

//重写header中的require请求 X-HTTP-Method-Override, 比如: DELETE/PUT---------
app.use(methodOverride('X-HTTP-Method-Override'));

//设置public目录为项目静态文件根目录----------------------------------------
app.use(express.static(__dirname + '/public'));

app.use(function (req, res, next) { console.log('Time: %d', Date.now());
  console.log(req.path);
  next(); });

app.set('x-powered-by', false);
app.use(function(req, res, next)
        {
          res.header('Access-Control-Allow-Origin', 'http://tegou.f3322.org');
          res.header('Access-Control-Allow-Origin', 'http://localhost');
          next();
        });
//routes 路由-------------------------------------------------------------
require('./app/routes')(app);

//启动app-----------------------------------------------------------------
//startup app at http://localhost:80 也就是 http://localhost
app.listen(port);

//返回app启动结果------------------------------------------------------------
console.log("应用angApp成功启动于 " + port + "端口!");

//暴露app
exports = module.exports = app;
