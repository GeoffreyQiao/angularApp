/**
 * @module db
 * @description 数据库配置文件
 * @type {{host: string}}
 */
var db;
db = {
  host   : 'localhost',
  dbName : 'product',
  port   : '27017'
};

module.exports = db;

/*
 * windows 下添加 MongoDB 为系统服务，以管理员运行 CMD 命令行，假设 MongoDB 安装目录为："C:/MongoDB"，则命令如下：
 * mongod.exe --config C:\MongoDB\mongodb.cfg --dbpath D:\MongoDB\data --install
 */
