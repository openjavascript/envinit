
const APP_ROOT = __dirname;
const PROJECT_ROOT = process.env.PWD;

require('babel-core/register');
const init = require( './src/app.es6' ).init;
init( APP_ROOT, PROJECT_ROOT );
