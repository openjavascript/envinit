
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
const info = chalk.blue;

import * as CONST from '../data/constant.es6';
import * as DATA from '../data/data.es6';


export default class App {
    constructor( appRoot, projectRoot ) {

        this.appRoot = appRoot;
        this.projectRoot = projectRoot;

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

        this.system = this.detectSystem();

        if( !this.system ){
            console.log( error( CONST.PROJECT_UNRECOGNIZED ) );
            return;
        }
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
            CONST.TITLE
          )
        );
        console.log();
    }

    detectSystem( ) {
        let r = 0;

        let cmd = [
            'cd ' + this.projectRoot
            , "git remote -v"
            //, 'echo ' + this.projectRoot
        ].join('&&') 

        let gitinfo = shell.exec( 
            cmd
        );

        console.log( gitinfo );

        return r;
    }

}

export function init( APP_ROOT, PROJECT_ROOT ){
    let AppIns = new App( APP_ROOT, PROJECT_ROOT ); 
}


/*
prompt( Q_PROJECT_LIST ).then( ()=>{
});
*/


//console.log( [ ROOT ].join( "\n" ) );

