
import {
    PROJECT_NAME
    , NEXT_VIRUS
    , PRIVATE_OPERATION
} from './constant.es6';


export const Q_PROJECT_LIST = [
    { 
        "type": "list"
        , "name": "choice_project"
        , "message": "请选择要初始化的系统"
        , "choices": [ PROJECT_NAME[ NEXT_VIRUS ], PROJECT_NAME[ PRIVATE_OPERATION ] ]
        , "default": PROJECT_NAME[ NEXT_VIRUS ]
    }
];
