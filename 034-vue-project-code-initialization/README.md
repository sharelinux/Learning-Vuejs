# Vue项目代码初始化

### 1. 添加禁止移动端缩放，以及手指放大、滑动
```js
    <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
```


### 2. 引入reset.css样式 -->
```js
// 在main.js 添加 reset.css
import './assets/styles/reset.css'
```
- Ref: https://gist.github.com/DavidWells/18e73022e723037a50d6


### 3. 引入border.css 解决移动端1像素边框问题 -->
```js
import './assets/styles/border.css'
```

- Ref: https://github.com/GIScyw/blog/blob/master/%E7%A7%BB%E5%8A%A8%E7%AB%AF/%E7%A7%BB%E5%8A%A8%E7%AB%AF1%E5%83%8F%E7%B4%A0%E9%97%AE%E9%A2%98.md

- Ref: https://xfy196.github.io/2020/07/29/1%E5%83%8F%E7%B4%A0%E8%BE%B9%E6%A1%86%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88/index.html


### 4. 通过fastClick解决移动端默认300ms默认延时问题
```sh
# 安装fastclick
npm install fastclick --save
```

```js
import fastClick from 'fastclick'

fastClick.attach(document.body)
```


### 5. iconfont (icon小图标)

- Ref: https://www.iconfont.cn/ (需要注册)
