"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var error = _chalk2.default.bold.red;
var warning = _chalk2.default.keyword('orange');
var success = _chalk2.default.greenBright;
var info = _chalk2.default.bold.blue;

var Project = function () {
    function Project(app) {
        _classCallCheck(this, Project);

        this.app = app;

        this.init();
    }

    _createClass(Project, [{
        key: "init",
        value: function init() {}
    }, {
        key: "initPublic",
        value: function initPublic() {
            if (!(this.app.init_public == 'yes')) return;
            console.log();
            console.log(info('初始化前端 public'));

            var cmd = "cd " + this.app.projectRoot + " && npm run public";
            var cmdinfo = _shelljs2.default.exec(cmd);
        }
    }, {
        key: "initPHP",
        value: function initPHP() {
            var cmd = "cd " + this.app.projectRoot + " && " + this.app.phptool + " install";
            console.log(info('安装php依赖'));
            var cmdinfo = _shelljs2.default.exec(cmd);
        }
    }, {
        key: "initPermission",
        value: function initPermission(isSudo, isUpdate) {
            console.log();

            if (isUpdate) {
                console.log(info(' update folder permission, need sudo'));
            } else {
                console.log(info(' init folder permission, need sudo'));
            }

            var sudocmd = '';
            isSudo && (sudocmd = 'sudo ');

            var cmd = sudocmd + ' chmod -R 777 ' + this.app.permissionDir.join(' ');
            if (this.app.fileExists(this.app.dir_vendor)) {
                cmd = [cmd, this.app.dir_vendor].join(' ');
            }

            var cmdinfo = _shelljs2.default.exec(cmd);
            //console.log( '11111111', cmdinfo, cmd );
        }
    }, {
        key: "initNode",
        value: function initNode() {
            var cmd = void 0,
                cmdinfo = void 0,
                pmg = void 0,
                pmgName = void 0;

            pmgName = this.app.nodeCmd;
            pmg = _shelljs2.default.which(pmgName);
            //console.log( pmg );
            if (pmg) {
                cmd = ['cd ' + this.app.projectRoot, pmgName + " install"].join('&&');
                console.log('\n', info("\u4F7F\u7528 " + pmgName + " \u5B89\u88C5node\u4F9D\u8D56\uFF0C\u5B89\u88C5\u901F\u5EA6\u53D6\u51B3\u4E8E\u4F60\u7684\u7F51\u7EDC, \u4E2D\u95F4\u51FA\u73B0\u9519\u8BEF\u8BF7\u5FFD\u7565."), '\n');
                cmdinfo = _shelljs2.default.exec(cmd);
                return;
            }

            /*
            pmgName = 'yarn';
            pmg = shell.which( pmgName );
            //console.log( pmg );
            if( pmg ) {
                cmd = [
                    'cd ' + this.app.projectRoot
                    , `${pmgName} install`
                ].join('&&') 
                console.log( '\n', info( `使用 ${pmgName} 安装node依赖，安装速度取决于你的网络, 中间出现错误请忽略.` ), '\n' );
                cmdinfo = shell.exec( cmd );
                return;
            }
              pmgName = 'cnpm';
            pmg = shell.which( pmgName );
            //console.log( pmg );
            if( pmg ) {
                cmd = [
                    'cd ' + this.app.projectRoot
                    , `${pmgName} install`
                ].join('&&') 
                console.log( '\n', info( `使用 ${pmgName} 安装node依赖，安装速度取决于你的网络，中间出现错误请忽略.` ), '\n' );
                cmdinfo = shell.exec( cmd );
                return;
            }
              pmgName = 'npm';
            pmg = shell.which( pmgName );
            //console.log( pmg );
            if( pmg ) {
                cmd = [
                    'cd ' + this.app.projectRoot
                    , `${pmgName} install`
                ].join('&&') 
                console.log( '\n', info( `使用 ${pmgName} 安装node依赖，安装速度取决于你的网络，中间出现错误请忽略.` ), '\n' );
                cmdinfo = shell.exec( cmd );
                return;
            }
            */

            console.log(error('无法安装node依赖，请安装 yarn, cnpm, npm'));
            return;
        }
    }, {
        key: "initStaticDir",
        value: function initStaticDir() {
            var _this = this;

            var public_dir = _fs2.default.readdirSync(this.app.dir_public);

            if (!this.app.fileExists(this.app.dir_public_dev)) {
                return;
            }

            public_dir.map(function (v) {
                _this.setLn(v);
            });
            this.setLn('modules/map_tiles');
            this.setLn('modules/map_fonts');
            this.setLn('modules/mapbox-gl');
        }
    }, {
        key: "setLn",
        value: function setLn(v) {
            if (!this.app.fileExists(this.app.dir_public_dev)) {
                return;
            }

            var src = [this.app.dir_public, v].join('/');
            var tar = [this.app.dir_public_dev, v].join('/');

            if (!_fs2.default.existsSync(src)) return;
            if (_fs2.default.existsSync(tar)) return;
            try {
                if (_fs2.default.readlinkSync(tar)) return;
            } catch (ex) {};

            var cmd = ['ln -s', src, tar].join(' ');
            _shelljs2.default.exec(cmd);
        }
    }, {
        key: "initProd",
        value: function initProd() {
            var data = void 0;
            if (!this.app.fileExists(this.app.file_prodsrc)) {
                return;
            }
            if (!this.app.fileExists(this.app.file_prod)) {
                //console.log( error( 'prod not exists' ) );
                data = _fs2.default.readFileSync(this.app.file_prodsrc, 'utf8');
                _fs2.default.writeFileSync(this.app.file_prod, data, { encoding: 'utf8' });
            }

            if (!data) {
                data = _fs2.default.readFileSync(this.app.file_prod, 'utf8');
            }

            if (this.app.ip) {
                data = data.replace(/.*\bhost\b.*/g, '');
                data = data.replace(/\}/, "    , \"host\": '" + this.app.ip + "'\n}");
            }

            if (this.app.port) {
                data = data.replace(/.*\bport\b.*/g, '');
                data = data.replace(/\}/, "    , \"port\": '" + this.app.port + "'\n}");
            }

            data = data.replace(/[\r\n][\r\n]+/g, "\n\n");

            _fs2.default.writeFileSync(this.app.file_prod, data, { encoding: 'utf8' });
        }
    }, {
        key: "initEnv",
        value: function initEnv() {
            var data = void 0;
            if (!this.app.fileExists(this.app.file_envsrc)) {
                return;
            }
            if (!this.app.fileExists(this.app.file_env)) {
                data = _fs2.default.readFileSync(this.app.file_envsrc, 'utf8');
                _fs2.default.writeFileSync(this.app.file_env, data, { encoding: 'utf8' });
            }

            if (!data) {
                data = _fs2.default.readFileSync(this.app.file_env, 'utf8');
            }

            if (this.app.db_pwd) {
                data = data.replace(/DB_PASSWORD.*/, "DB_PASSWORD=" + this.app.db_pwd);
            }

            data = data.replace(/REDIS_PASSWORD.*/, '');

            if (this.app.host) {
                data = data.replace(/F2E_URL[^\n]+/g, '');
                data = [data, "F2E_URL=//" + this.app.host].join("\n");
            }

            data = data.replace(/[\r\n][\r\n]+/g, "\n\n");

            _fs2.default.writeFileSync(this.app.file_env, data, { encoding: 'utf8' });
        }
    }]);

    return Project;
}();

exports.default = Project;