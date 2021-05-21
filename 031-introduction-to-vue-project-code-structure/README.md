## Vue项目代码结构介绍

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
