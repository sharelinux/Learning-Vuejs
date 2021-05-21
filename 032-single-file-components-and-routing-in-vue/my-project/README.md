# my-project

### 1. nodejs 安装
  node -v
  npm -v

### 2. git安装
### 3. 使用gitee或GitHub进行代码管理

    brew install node
    brew upgrade node
    brew uninstall node

### 4. 创建Vue项目
```sh
    # 全局安装命令工具
    npm install --global vue-cli
    npm install -g @vue/cli

    # 验证vue安装是否成功和版本
    vue --version

    # 创建一个基于webpack模板的新项目
    vue init webpack my-project

    # 安装依赖, 进入项目
    cd my-project
    npm install
    npm run dev

    # 访问demo项目
    http://localhost:8080/#/

```

```sh
❯ vue init webpack my-project

? Project name my-project
? Project description A Vue.js project
? Author Anjie Li <sharelinuxs@gmail.com>
? Vue build standalone
? Install vue-router? Yes
? Use ESLint to lint your code? Yes
? Pick an ESLint preset Standard
? Set up unit tests No
? Setup e2e tests with Nightwatch? No
? Should we run `npm install` for you after the project has been created? (recommended) npm
```

### 参考
    - https://www.fosstechnix.com/install-node-js-on-mac/
    - https://nodejs.org/en/
    - gitee.com
    - nvm node 多环境管理
        > `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash`

### 注意事项 (vue项目中软连接文件问题)
```sh
cp -RLP my-project 032-single-file-components-and-routing-in-vue/my-project2
```
