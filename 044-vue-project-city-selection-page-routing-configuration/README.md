## 城市选择页面 - 路由配置

### 1. 在src/router/index.js添加路由注册

```html
export default new Router({
  routes: [{
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/city',
    name: 'City',
    component: City
  }]
})
```


### 2. 在 src/pages/city/City.vue创建路由选择页内容
```html
<template>
<!-- <div>City</div> -->
<city-header></city-header>
</template>

<script>
import cityHeader from './components/Header'
export default {
  name: 'City',
  components: {
    cityHeader
  }
}
</script>

<style lang="stylus" scoped>

</style>
```


### 3. src/pages/city/components/Header.vue
```html
 <template>
  <div class="header">
    城市选择
    <router-link to='/'>
      <div class="iconfont header-back">&#xe624;</div>
    </router-link>

  </div>
 </template>

<script>
export default {
  name: 'cityHeader'
}
</script>

<style lang="stylus" scoped>
   @import '~styles/varibles.styl'
  .header
    position: relative
    overflow: hidden
    height: $headerHeight
    line-height: $headerHeight
    text-align: center
    color: #fff
    background: $bgColor
    font-size: .32rem
    .header-back
      position: absolute
      top: 0
      left: 0
      width: .64rem
      text-align: center
      font-size: .4rem
      color: #fff
</style>
```