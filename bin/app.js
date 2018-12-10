"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.init = init;

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _clear = require("clear");

var _clear2 = _interopRequireDefault(_clear);

var _figlet = require("figlet");

var _figlet2 = _interopRequireDefault(_figlet);

var _shelljs = require("shelljs");

var _shelljs2 = _interopRequireDefault(_shelljs);

var _inquirer = require("inquirer");

var _inquirer2 = _interopRequireDefault(_inquirer);

var _constant = require("./data/constant.js");

var CONST = _interopRequireWildcard(_constant);

var _data = require("./data/data.js");

var DATA = _interopRequireWildcard(_data);

var _ProjectNextVirus = require("./ProjectNextVirus.js");

var _ProjectNextVirus2 = _interopRequireDefault(_ProjectNextVirus);

var _ProjectPrivateOperation = require("./ProjectPrivateOperation.js");

var _ProjectPrivateOperation2 = _interopRequireDefault(_ProjectPrivateOperation);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var error = _chalk2.default.bold.red;
var warning = _chalk2.default.keyword('orange');
var success = _chalk2.default.greenBright;
var info = _chalk2.default.bold.blue;

var App = function () {
    function App(appRoot, projectRoot, packJSON) {
        _classCallCheck(this, App);

        this.appRoot = appRoot;
        this.projectRoot = projectRoot;
        this.packJSON = packJSON;

        console.log(['appRoot: ' + this.appRoot, 'projectRoot: ' + this.projectRoot].join("\n"));

        this.init();

        console.log();
    }

    _createClass(App, [{
        key: "init",
        value: function init() {
            var _this = this;

            (0, _clear2.default)();

            this.gitdir = [this.projectRoot, '.git'].join('/');

            this.file_envsrc = [this.projectRoot, '.env.example'].join('/');
            this.file_env = [this.projectRoot, '.env'].join('/');

            this.file_prodsrc = [this.projectRoot, 'prod.config.js.example'].join('/');
            this.file_prod = [this.projectRoot, 'prod.config.js'].join('/');

            this.dir_public = [this.projectRoot, 'public'].join('/');
            this.dir_public_dev = [this.projectRoot, 'public_dev'].join('/');

            this.dir_vendor = [this.projectRoot, 'vendor'].join('/');

            this.phptool = [this.appRoot, 'tools', 'composer.phar'].join('/');

            this.init_public = 'no';

            this.permissionDir = [[this.projectRoot, 'bootstrap'].join('/'), [this.projectRoot, 'storage'].join('/'), [this.projectRoot, 'public'].join('/'), [this.projectRoot, 'public_dev'].join('/'), this.phptool];

            this.ip = '';
            this.port = '';
            this.host = '';
            this.db_pwd = '';

            this.system;
            this.systemName;
            this.systemData;

            this.project;

            this.prompt = _inquirer2.default.createPromptModule();
            this.welcome();

            if (!this.fileExists(this.projectRoot)) {
                console.log(error(CONST.PROJECT_ROOT_NOT_EXISTS));
                console.log(error(this.projectRoot));
                return;
            }

            if (!this.fileExists(this.gitdir)) {
                console.log(error(CONST.PROJECT_NOT_GIT));
                console.log(error(this.gitdir));
                return;
            }

            this.systemName = this.detectSystem();
            if (this.systemName) {
                this.systemData = CONST.PROJECT_ITEMS[this.systemName];
                this.system = this.systemData.value;
            }
            /*
            console.log( this.systemName, this.system );
            return;
            */
            if (!this.system) {
                console.log(error(CONST.PROJECT_UNRECOGNIZED));
                return;
            }
            _shelljs2.default.exec(['cd ' + this.projectRoot, 'git config core.fileMode false && git config core.autocrlf false'].join('&&'));

            console.log();
            this.getHost().then(function () {
                if (_this.ip) {
                    console.log();
                    return _this.getPort();
                } else {
                    return new Promise(function (resolve) {
                        setTimeout(resolve, 1);
                    });
                }
            }).then(function () {
                console.log();
                return _this.getDbPwd();
            }).then(function () {
                console.log();
                return _this.nodeCmdList();
            }).then(function () {
                console.log();
                return _this.initPublic();
            }).then(function () {
                console.log();
                if (_this.ip) {
                    _this.host = _this.ip;
                }
                if (_this.port) {
                    if (_this.host) {
                        _this.host = [_this.host, _this.port].join(':');
                    }
                }

                if (_this.host) {
                    console.log(info(['host：', _this.host].join(' ')));
                }

                return new Promise(function (resolve) {
                    setTimeout(resolve, 1);
                });
            }).then(function () {
                var projectLogic = _this['project_' + _this.system];
                if (!projectLogic) return;

                projectLogic = projectLogic.bind(_this);
                //console.log( `project ${this.system} logic,`, this.systemName );
                projectLogic();
            });
        }
    }, {
        key: "project_1",
        value: function project_1() {
            this.project = new _ProjectNextVirus2.default(this);
        }
    }, {
        key: "project_2",
        value: function project_2() {
            this.project = new _ProjectPrivateOperation2.default(this);
        }
    }, {
        key: "nodeCmdList",
        value: async function nodeCmdList() {
            var tmp = this.initCmdList();
            var data = await this.prompt(tmp);
            this.nodeCmd = (data.nodeCmd || '').trim();
        }
    }, {
        key: "initCmdList",
        value: function initCmdList() {
            var tmp = DATA.Q_NODE_CMD_LIST,
                list = ['npm'],
                def = list[0],
                cmd = '';

            cmd = 'cnpm';
            if (_shelljs2.default.which(cmd)) {
                list.unshift(cmd);
                def = cmd;
            }

            cmd = 'yarn';
            if (_shelljs2.default.which(cmd)) {
                list.unshift(cmd);
                def = cmd;
            }

            DATA.Q_NODE_CMD_LIST[0].choice = list;
            DATA.Q_NODE_CMD_LIST[0].default = def;

            return tmp;
        }
    }, {
        key: "initPublic",
        value: async function initPublic() {
            var data = await this.prompt(DATA.Q_INIT_PUBLIC);
            this.init_public = (data.init_public || '').trim();
        }
    }, {
        key: "getHost",
        value: async function getHost() {
            var data = await this.prompt(DATA.Q_IP_LIST);
            this.ip = (data.ip || '').trim();
        }
    }, {
        key: "getPort",
        value: async function getPort() {
            var data = await this.prompt(DATA.Q_PORT_LIST);
            this.port = data.port;
        }
    }, {
        key: "getDbPwd",
        value: async function getDbPwd() {
            var data = await this.prompt(DATA.Q_DB_PWD_LIST);
            this.db_pwd = data.db_pwd;
        }
    }, {
        key: "fileExists",
        value: function fileExists(file) {
            return _fs2.default.existsSync(file);
        }
    }, {
        key: "welcome",
        value: function welcome() {
            console.log(_chalk2.default.yellow(_figlet2.default.textSync(CONST.APPNAME, { horizontalLayout: 'full' })));
            console.log(_chalk2.default.bold.yellow(CONST.TITLE + " - " + this.packJSON.version));
            console.log();
            console.log(info('github: https://github.com/openjavascript/envinit'));

            console.log();
            console.log(info('使用:'));
            console.log(info('     方法1: 切换到项目根目录, 然后执行命令 envinit'));
            console.log(info('            cd projectRoot && envinit'));
            console.log();
            console.log(info('     方法2: 使用 envinit 路径, 支持相对路径'));
            console.log(info('            envinit /var/www/your_project_root'));
            console.log();
        }
    }, {
        key: "detectSystem",
        value: function detectSystem() {
            var r = 0;

            var cmd = ['cd ' + this.projectRoot, "git remote -v"
            //, 'echo ' + this.projectRoot
            ].join('&&');

            var cmdinfo = _shelljs2.default.exec(cmd);

            //console.dir( CONST.PROJECT_ITEMS )

            //console.log( cmdinfo );

            for (var k in CONST.PROJECT_ITEMS) {
                if (cmdinfo.indexOf(k) < 0) continue;
                r = k;
                break;
            }

            return r;
        }
    }]);

    return App;
}();

exports.default = App;
function init(APP_ROOT, PROJECT_ROOT, packJSON) {
    var AppIns = new App(APP_ROOT, PROJECT_ROOT, packJSON);
}