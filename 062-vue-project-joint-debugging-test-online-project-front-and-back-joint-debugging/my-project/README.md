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

### vue项目目录、文件说明
```sh
tree my-project -L 1 -a
my-project
├── .babelrc            # babel配置文件
├── .editorconfig       # 编辑器器的语法
├── .eslintignore       # eslintignore定义不受eslint代码检测的文件和目录
├── .eslintrc.js        # eslint代码规范检测
├── .gitignore          # git忽略文件
├── .postcssrc.js       # postcss配置文件
├── README.md           # 项目说明文件
├── build               # 项目打包的webpack配置
│   ├── build.js
│   ├── check-versions.js
│   ├── logo.png
│   ├── utils.js
│   ├── vue-loader.conf.js
│   ├── webpack.base.conf.js   # 发环境webpack配置项
│   ├── webpack.dev.conf.js    # 基础webpack配置项
│   └── webpack.prod.conf.js   # 线上生产环境webpack配置项
├── config              # 项目配置文件
│   ├── dev.env.js         # 开发环境配置信息
│   ├── index.js           # 基础配置信息
│   └── prod.env.js        # 线上生产环境配置信息
├── index.html.         # 项目首页模板文件
├── node_modules        # 放置nodejs第三方依赖包
├── package-lock.json   # package锁文件
├── package.json.       # 依赖包
├──src                  # 整个项目源代码文件目录
│   ├── App.vue             # vue根组件
│   ├── assets              # 项目图片类资源
│   │   └── logo.png
│   ├── components          # vue组件目录
│   │   └── HelloWorld.vue
│   ├── main.js             # 项目总入口文件
│   └── router              # 路由入口文件
│       └── index.js
└── static              # 放置的静态资源和demo数据目录
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
