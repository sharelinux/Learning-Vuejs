## 首页Header区域开发

### 1. 安装stylus
```sh
npm install stylus --save
npm install stylus-loader --save --legacy-peer-deps
```


### 2. header组件使用stylus
> scoped关键字用来阻止css定义只对本组件生效


### 3. stylus和stylus-loader版本不兼容
`Module build failed: TypeError: this.getOptions is not a function`

> 原因less-loader安装的版本过高 解决方案：
```sh
npm uninstall stylus-loader
npm install stylus-loader@3.0.2 --save
npm install stylus-loader@3.0.2 --save-dev
npm run dev

# 教程版本信息
# stylus@0.54.5
# stylus-loader@3.0.1
```


### 4. 定义Header组件

```html
<div class="header">
<div class="header-left">返回</div>
<div class="header-input">内容</div>
<div class="header-right">城市</div>
</div>

<style lang="stylus" scoped>
  /* 1rem = html font-size = 50px */
  .header
    display: flex
    line-height: .86rem
    background: #00bcd4
    color: #fff
    .header-left
      width: .64rem
      float: left
    .header-input
      flex: 1
      height: .64rem
      line-height: .64rem
      margin-top: .12rem
      margin-left: .2rem
      padding-left: .2rem
      background: #fff
      border-radius: .1rem
      color: #ccc
    .header-right
      width: 1.24rem
      float: right
      text-align : center
</style>
```

### 基础概念
> 1rem = html font-size = 50px
