## iconfont的使用和代码优化

### 下载iconfont
- Ref: https://www.iconfont.cn/


### 使用iconfont
1. 在assets/styles/iconfont目录放置对应的字体

2. 在assets/styles/iconfont.css修改字体相对路径

3. 在main.js中引入iconfont.css
```js
import './assets/styles/iconfont.css'
```

4. 在Header.vue中使用 iconfont
```html
<template>
  <div class="header">
    <div class="header-left">
        <div class="iconfont back-icon">&#xe624;</div>
    </div>

    <div class="header-input">
      <span class="iconfont">&#xe632;</span>
      输入城市/景点/游玩主题
    </div>
    <div class="header-right">
      城市
      <span class="iconfont arrow-icon">&#xe6aa;</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeHeader'
}
</script>

<style lang="stylus" scoped>
  /* 1rem = html font-size = 50px */
  /* @import '../../../assets/styles/varibles.styl' */
  /* @import '~@/assets/styles/varibles.styl' */
  @import '~styles/varibles.styl'
  .header
    display: flex
    line-height: .86rem
    background: $bgColor
    color: #fff
    .header-left
      width: .64rem
      float: left
      .back-icon
        text-align: center
        font-size: .4rem
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
      .arrow-icon
        margin-left: -.04rem
        font-size: .24rem
</style>
```

### 代码优化
1. 变量替换
```js
// 公共变量抽离
@import '../../../assets/styles/varibles.styl'
```

2. 相对路径使用
> @相对src目录
```js
@import '~@/assets/styles/varibles.styl'
```

3. 别名定义和使用
> 在webpack.base.conf.js定义别名，需要项目重启

- 别名定义
```js
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'styles': resolve('src/assets/styles'),
    }
  },
```

- 别名使用
```js
// Header.vue中使用
@import '~styles/varibles.styl'

// main.js中使用
import 'styles/reset.css'
import 'styles/border.css'
import 'styles/iconfont.css'
```
