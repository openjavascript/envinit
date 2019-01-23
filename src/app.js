
import fs from "fs";
import path from "path";

import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';

import shell from 'shelljs';

import inquirer from 'inquirer';

const error = chalk.bold.red;
const warning = chalk.keyword('orange');
const success = chalk.greenBright;
const info = chalk.bold.blue;

import * as CONST from './data/constant.js';
import * as DATA from './data/data.js';

import ProjectNextVirus from './ProjectNextVirus.js';
import ProjectPrivateOperation from './ProjectPrivateOperation.js';
import ProjectAutoPenetrationTest from './ProjectAutoPenetrationTest.js';

export default class App {
    constructor( appRoot, projectRoot, packJSON ) {

        this.appRoot = appRoot;
        this.projectRoot = projectRoot;
        this.packJSON = packJSON;

        console.log( [ 
            'appRoot: ' + this.appRoot
            , 'projectRoot: ' + this.projectRoot 
            ].join("\n") );

        this.init();

        console.log();
    }

    init() {
        clear();

        this.gitdir = [ this.projectRoot, '.git' ].join( '/' );


        this.file_envsrc = [ this.projectRoot, '.env.example' ].join( '/' );
        this.file_env = [ this.projectRoot, '.env' ].join( '/' );

        this.file_prodsrc = [ this.projectRoot, 'prod.config.js.example' ].join( '/' );
        this.file_prod = [ this.projectRoot, 'prod.config.js' ].join( '/' );

        this.dir_public = [ this.projectRoot, 'public' ].join( '/' );
        this.dir_public_dev = [ this.projectRoot, 'public_dev' ].join( '/' );

        this.dir_vendor = [ this.projectRoot, 'vendor' ].join( '/' );

        this.phptool = [ this.appRoot, 'tools', 'composer.phar' ].join( '/' );

        this.init_public = 'no';

        this.permissionDir = [
            [ this.projectRoot, 'bootstrap' ].join( '/' )
            , [ this.projectRoot, 'storage' ].join( '/' )
            , [ this.projectRoot, 'public' ].join( '/' )
            , [ this.projectRoot, 'public_dev' ].join( '/' )
            , this.phptool
        ];

        this.ip         = '';
        this.port       = '';
        this.host       = '';
        this.db_pwd     = '';

        this.system;
        this.systemName;
        this.systemData;

        this.project;

        this.prompt = inquirer.createPromptModule();
        this.welcome();

        if( !this.fileExists( this.projectRoot ) ) {
            console.log( error( CONST.PROJECT_ROOT_NOT_EXISTS ) );
            console.log( error( this.projectRoot ) );
            return;
        }

        if( !this.fileExists( this.gitdir ) ) {
            console.log( error( CONST.PROJECT_NOT_GIT ) );
            console.log( error( this.gitdir ) );
            return;
        }

        this.systemName = this.detectSystem();
        if( this.systemName ){
            this.systemData = CONST.PROJECT_ITEMS[ this.systemName ];
            this.system = this.systemData.value;
        }
        /*
        console.log( this.systemName, this.system );
        return;
        */
        if( !this.system ){
            console.log( error( CONST.PROJECT_UNRECOGNIZED ) );
            return;
        }
        shell.exec(  [ 
            'cd ' + this.projectRoot
            , 'git config core.fileMode false && git config core.autocrlf false'
        ].join('&&') );

        console.log();
        this.getHost().then( ()=> {
            if( this.ip ){
                console.log();
                return this.getPort();
            }else{
                return new Promise( function( resolve ){
                    setTimeout( resolve, 1);
                });
            }
        }).then( ()=>{
            console.log();
            return this.getDbPwd();
        }).then( () => {
            console.log();
            return this.nodeCmdList();
        }).then( () => {
            console.log();
            return this.initPublic();
        }).then( () => {
            console.log();
            if( this.ip ) {
                this.host = this.ip;
            }
            if( this.port ) {
                if( this.host ){
                    this.host = [ this.host, this.port ].join(':');
                }
            }

            if( this.host ){
                console.log( info( [ 'host：', this.host ].join(' ' ) ) );
            }

            return new Promise( function( resolve ){
                setTimeout( resolve, 1);
            });
        }).then( ()=>{
            let projectLogic = this[ 'project_' + this.system ];
            if( !projectLogic ) return;

            projectLogic = projectLogic.bind( this );
            //console.log( `project ${this.system} logic,`, this.systemName );
            projectLogic();
        });
    }

    project_1() {
        this.project = new ProjectNextVirus( this );
    }

    project_2() {
        this.project = new ProjectPrivateOperation( this );
    }

    project_3() {
        this.project = new ProjectAutoPenetrationTest( this );
    }

    async nodeCmdList() {
        let tmp = this.initCmdList();
        let data = await this.prompt( tmp  );
        this.nodeCmd = ( data.nodeCmd || '' ).trim();
    }

    initCmdList() {
        let tmp = DATA.Q_NODE_CMD_LIST
            , list = [ 'npm' ]
            , def = list[0]
            , cmd = ''
            ;

        cmd = 'cnpm';
        if( shell.which( cmd ) ){
            list.unshift( cmd );
            def = cmd;
        }

        cmd = 'yarn';
        if( shell.which( cmd ) ){
            list.unshift( cmd );
            def = cmd;
        }

        DATA.Q_NODE_CMD_LIST[0].choice = list;
        DATA.Q_NODE_CMD_LIST[0].default = def;

        return tmp;
    }

    async initPublic(){
        let data = await this.prompt( DATA.Q_INIT_PUBLIC );
        this.init_public = ( data.init_public || '' ).trim();
    }

    async getHost(){
        let data = await this.prompt( DATA.Q_IP_LIST );
        this.ip = ( data.ip || '' ).trim();
    }

    async getPort(){
        let data = await this.prompt( DATA.Q_PORT_LIST );
        this.port = data.port;
    }

    async getDbPwd(){
        let data = await this.prompt( DATA.Q_DB_PWD_LIST );
        this.db_pwd = data.db_pwd;
    }

    fileExists( file ) {
        return fs.existsSync( file );
    }

    welcome() {
        console.log(
          chalk.yellow(
            figlet.textSync( CONST.APPNAME, { horizontalLayout: 'full' })
          )
        );
        console.log(
          chalk.bold.yellow(
            `${CONST.TITLE} - ${this.packJSON.version}`
          )
        );
        console.log();
        console.log( info( 'github: https://github.com/openjavascript/envinit' ) );

        console.log();
        console.log( info( '使用:' ) );
        console.log( info( '     方法1: 切换到项目根目录, 然后执行命令 envinit' ) );
        console.log( info( '            cd projectRoot && envinit' ) );
        console.log();
        console.log( info( '     方法2: 使用 envinit 路径, 支持相对路径' ) );
        console.log( info( '            envinit /var/www/your_project_root' ) );
        console.log();
    }

    detectSystem( ) {
        let r = 0;

        let cmd = [
            'cd ' + this.projectRoot
            , "git remote -v"
            //, 'echo ' + this.projectRoot
        ].join('&&') 

        let cmdinfo = shell.exec( cmd );

        //console.dir( CONST.PROJECT_ITEMS )

        //console.log( cmdinfo );

        for( let k in CONST.PROJECT_ITEMS ){
            if( cmdinfo.indexOf( k ) < 0 ) continue;
            r = k;
            break;
        }

        return r;
    }

}

export function init( APP_ROOT, PROJECT_ROOT, packJSON ){
    let AppIns = new App( APP_ROOT, PROJECT_ROOT, packJSON ); 
}

