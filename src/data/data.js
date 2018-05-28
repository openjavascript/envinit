
import {
    PROJECT_ITEMS
    , NEXT_VIRUS
    , PRIVATE_OPERATION
} from './constant.js';


export const Q_PROJECT_LIST = [
    { 
        "name": "choice_project"
        , "type": "list"
        , "message": "请选择要初始化的系统"
        , "choices": [ PROJECT_ITEMS[ NEXT_VIRUS ].name, PROJECT_ITEMS[ PRIVATE_OPERATION ].name ]
        , "default": PROJECT_ITEMS[ NEXT_VIRUS.name ]
    }
];

export let Q_NODE_CMD_LIST = [
    { 
        "name": "nodeCmd"
        , "type": "list"
        , "message": "请选择初始化node_modules的命令"
        , "choices": [ 'yarn', 'cnpm', 'npm' ]
        , "default": 'yarn'
    }
];

export const Q_INIT_PUBLIC = [
    { 
        "name": "init_public"
        , "type": "list"
        , "message": "是否需要初始化前端public目录"
        , "choices": [ 'yes', 'no' ]
        , "default": 'no'
    }
];


export const Q_IP_LIST = [
    { 
        "name": "ip"
        , "type": "input"
        , "message": "请输入静态资源HOST/IP, 无须设置请按回车。"
    }
];

export const Q_PORT_LIST = [
    { 
        "name": "port"
        , "type": "input"
        , "message": "请输入静态资源端口号, 无须设置请按回车。"
    }
];

export const Q_DB_PWD_LIST = [
    { 
        "name": "db_pwd"
        , "type": "password"
        , "message": "请输入数据库密码, 无须设置请按回车。"
    }
];
