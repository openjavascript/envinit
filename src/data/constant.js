

export const APPNAME = 'ENVINIT';
export const TITLE = '项目环境初始化工具';

export const NEXT_VIRUS = "next_virus_scanner_web";
export const PRIVATE_OPERATION = "private_operation_web";
export const NEW_PRIVATE_OPERATION = "cloud_manager";

let project_items = {};
project_items[ NEXT_VIRUS ] =  {
    "name": "行为分析项目"
    , "value": "1"
};
project_items[ PRIVATE_OPERATION ] =  {
    "name": "云运营平台"
    , "value": "2"
};
project_items[ NEW_PRIVATE_OPERATION ] =  {
    "name": "云运营平台"
    , "value": "2"
};
export const PROJECT_ITEMS = project_items;

export const PROJECT_ROOT_NOT_EXISTS = "找不到项目根目录, 请指定有效的目录";

export const PROJECT_UNRECOGNIZED = "无法识别的系统";

export const PROJECT_NOT_GIT = "该目录不是一个有效的git项目";
