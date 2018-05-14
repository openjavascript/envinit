
# envinit 项目环境初始化工具

## 工具的作用
    流程化初始项目前后端环境, 节约环境配置时间

    注意: 这个工具只能初始化开发环境, 服务器环境还是需要自己手动搭建

## 全局安装
    sudo cnpm install envinit -g

## 使用
### 方法1: 换到项目根目录, 然后执行命令 envinit
    cd projectRoot && envinit

### 方法2: 使用 envinit 路径, 支持相对路径
    envinit /var/www/your_project_root

## 注意事项
    public_dev 的资源目录是使用 symlink 软链到  public上下的, 不是直接拷贝

    运营项目目前不支持配置 IP 和 端口功能
