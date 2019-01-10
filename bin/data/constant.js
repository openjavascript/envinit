'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var APPNAME = exports.APPNAME = 'ENVINIT';
var TITLE = exports.TITLE = '项目环境初始化工具';

var NEXT_VIRUS = exports.NEXT_VIRUS = "next_virus_scanner_web";
var PRIVATE_OPERATION = exports.PRIVATE_OPERATION = "private_operation_web";
var NEW_PRIVATE_OPERATION = exports.NEW_PRIVATE_OPERATION = "cloud_manager";

var project_items = {};
project_items[NEXT_VIRUS] = {
    "name": "行为分析项目",
    "value": "1"
};
project_items[PRIVATE_OPERATION] = {
    "name": "云运营平台",
    "value": "2"
};
project_items[NEW_PRIVATE_OPERATION] = {
    "name": "云运营平台",
    "value": "2"
};
var PROJECT_ITEMS = exports.PROJECT_ITEMS = project_items;

var PROJECT_ROOT_NOT_EXISTS = exports.PROJECT_ROOT_NOT_EXISTS = "找不到项目根目录, 请指定有效的目录";

var PROJECT_UNRECOGNIZED = exports.PROJECT_UNRECOGNIZED = "无法识别的系统";

var PROJECT_NOT_GIT = exports.PROJECT_NOT_GIT = "该目录不是一个有效的git项目";