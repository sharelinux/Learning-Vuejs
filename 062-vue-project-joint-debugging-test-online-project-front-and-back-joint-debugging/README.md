## Vue项目联调测试上线-项目前后端联调


### 1. 基于python后端服务准备

> 后端python环境准备
```sh
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install flask
```

> 后端python代码
```python
from flask import Flask, Blueprint, jsonify
import json

app = Flask(__name__)
api = Blueprint('api', __name__)
app.register_blueprint(api, url_prefix='/api')


def getIndexJson():
   f = open('index.json',)
   data = json.load(f)
   return data


@app.route('/', methods=['get'])
def index():
    return "hello flask"


@app.route('/api')
def api_root():
    res = {'status': "ok"}
    return jsonify(res)


@app.route('/api/index.json')
def api_index():
    res = getIndexJson()
    return jsonify(res)


if __name__ == "__main__":
    # 打印注册的flask路由信息
    print(app.url_map)
    app.run(debug=True)
```

> 访问 http://127.0.0.1:5000/api/index.json


### 2. Vue项目的接口联调

> 将前端static/mock改名为 static/mock_让路由前端静态文件路由失效

> 修改前端页面内容 config/index.js

```js
'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    //  配置webpack-dev-server开发环境转发代理
    proxyTable: {
        // 1. 前端测试的mock后端数据接口
        // '/api': {
        //     target: 'http://localhost:8080',
        //     pathRewrite: {
        //         '^/api': 'static/mock'
        //     }
        // }

        // 2. 真是后端数据接口
        '/api': {
            target: 'http://localhost:5000',
        }
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
```


### 3. 编写服务启动脚本

```sh
#!/bin/bash

trap "StopService" SIGHUP SIGINT SIGTERM


function start_backend_srv() {
    if [[ -d "$(pwd)/venv" ]];then
        echo 'start backend service'
        source venv/bin/activate

        python app.py &>/dev/null &
    else
        echo 'no venv'
    fi

}

function start_vue_srv() {
    echo 'start front-end service'
    cd my-project
    npm run dev
}

function StopService() {
    echo 'stop backend service...'

    pkill -f app.py
    # pgrep -f name
    # pkill -f name
    # pidof name

    echo 'stop front-end service...'
    pkill -f 'webpack-dev-server'

    echo 'Shop Done'
}

start_backend_srv
start_vue_srv
```
