

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

export default class Project {
    constructor( app ){
        this.app = app;

        this.init();
    }

    init() {
    }

    initPublic() {
        if( !( this.app.init_public == 'yes' ) ) return;
        console.log();
        console.log( info( '初始化前端 public' ) );

        let cmd = `cd ${this.app.projectRoot} && npm run public`;
        let cmdinfo = shell.exec( cmd );
    }

    initPHP() {
        let cmd = `cd ${this.app.projectRoot} && ${this.app.phptool} install`;
        console.log( info( '安装php依赖' ) );
        let cmdinfo = shell.exec( cmd );
    }

    initPermission( isSudo, isUpdate ) {
        console.log();

        if( isUpdate ){
            console.log( info( ' update folder permission, need sudo' ) );
        }else{
            console.log( info( ' init folder permission, need sudo' ) );
        }

        let sudocmd = '';
        isSudo && ( sudocmd = 'sudo ' );

        let cmd = sudocmd + ' chmod -R 777 ' + this.app.permissionDir.join( ' ' );
        if( this.app.fileExists( this.app.dir_vendor ) ){
            cmd = [ cmd, this.app.dir_vendor ] .join( ' ' );
        }

        let cmdinfo = shell.exec( cmd );
        //console.log( '11111111', cmdinfo, cmd );
    }

    initNode() {
        let cmd, cmdinfo, pmg, pmgName;


        pmgName = this.app.nodeCmd;
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

        console.log( error( '无法安装node依赖，请安装 yarn, cnpm, npm' ) );
        return;
    }

    initStaticDir() {
        let public_dir = fs.readdirSync( this.app.dir_public );

        public_dir.map( ( v ) => {
            //console.log( v );
            let src = [ this.app.dir_public, v ].join( '/' );
            let tar  = [ this.app.dir_public_dev, v ].join( '/' );

            if( !fs.lstatSync(src).isDirectory() ) return;
            if( fs.existsSync( tar ) ) return;

            let cmd = [ 'ln -s', src, tar ].join( ' ' );
            shell.exec( cmd );
        });
    }

    initProd() {
        let data;
        if( !this.app.fileExists( this.app.file_prod ) ) {
            //console.log( error( 'prod not exists' ) );
            data = fs.readFileSync( this.app.file_prodsrc,'utf8'); 
            fs.writeFileSync( this.app.file_prod, data, { encoding: 'utf8' } );
        }

        if( !data ){
            data = fs.readFileSync( this.app.file_prod,'utf8'); 
        }

        if( this.app.ip ){
            data = data.replace( /.*\bhost\b.*/g, '' );
            data = data.replace( /\}/, `    , "host": '${this.app.ip}'\n}` );
        }

        if( this.app.port ){
            data = data.replace( /.*\bport\b.*/g, '' );
            data = data.replace( /\}/, `    , "port": '${this.app.port}'\n}` );
        }

        data = data.replace( /[\r\n][\r\n]+/g, "\n\n" );

        fs.writeFileSync( this.app.file_prod, data, { encoding: 'utf8' } );
    }

    initEnv() {
        let data;
        if( !this.app.fileExists( this.app.file_env ) ) {
            data = fs.readFileSync( this.app.file_envsrc,'utf8'); 
            fs.writeFileSync( this.app.file_env, data, { encoding: 'utf8' } );
        }

        if( !data ){
            data = fs.readFileSync( this.app.file_env,'utf8'); 
        }

        if( this.app.db_pwd ){
            data = data.replace( /DB_PASSWORD.*/, `DB_PASSWORD=${this.app.db_pwd}` );
        }

        data = data.replace( /REDIS_PASSWORD.*/, '' );

        if( this.app.host ){
            data = data.replace( /F2E_URL[^\n]+/g, '' );
            data = [ data, `F2E_URL=//${this.app.host}` ].join( "\n" );
        }

        data = data.replace( /[\r\n][\r\n]+/g, "\n\n" );

        fs.writeFileSync( this.app.file_env, data, { encoding: 'utf8' } );
    }

}
