"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Q_DB_PWD_LIST = exports.Q_PORT_LIST = exports.Q_IP_LIST = exports.Q_INIT_PUBLIC = exports.Q_PROJECT_LIST = undefined;

var _constant = require("./constant.js");

var Q_PROJECT_LIST = exports.Q_PROJECT_LIST = [{
    "name": "choice_project",
    "type": "list",
    "message": "请选择要初始化的系统",
    "choices": [_constant.PROJECT_ITEMS[_constant.NEXT_VIRUS].name, _constant.PROJECT_ITEMS[_constant.PRIVATE_OPERATION].name],
    "default": _constant.PROJECT_ITEMS[_constant.NEXT_VIRUS.name]
}];

var Q_INIT_PUBLIC = exports.Q_INIT_PUBLIC = [{
    "name": "init_public",
    "type": "list",
    "message": "是否需要初始化前端public目录",
    "choices": ['yes', 'no'],
    "default": 'no'
}];

var Q_IP_LIST = exports.Q_IP_LIST = [{
    "name": "ip",
    "type": "input",
    "message": "请输入静态资源HOST/IP, 无须设置请按回车。"
}];

var Q_PORT_LIST = exports.Q_PORT_LIST = [{
    "name": "port",
    "type": "input",
    "message": "请输入静态资源端口号, 无须设置请按回车。"
}];

var Q_DB_PWD_LIST = exports.Q_DB_PWD_LIST = [{
    "name": "db_pwd",
    "type": "password",
    "message": "请输入数据库密码, 无须设置请按回车。"
}];