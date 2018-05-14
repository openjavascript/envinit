
import fs from "fs";
import path from "path";

import chalk from 'chalk';
import clear from 'clear';


const error = chalk.bold.red;
const warning = chalk.keyword('orange');
const success = chalk.greenBright;
const info = chalk.bold.blue;

import Project from './Project.js';

export default class ProjectPrivateOperation extends Project {
    constructor( app ){
        super( app );
    }

    init() {
        this.initEnv();
        //this.initProd();
        this.initStaticDir();
        this.initPermission(true);
        this.initNode();
        this.initPHP();
        this.initPermission( true, true );
        this.initPublic();
    }
}
