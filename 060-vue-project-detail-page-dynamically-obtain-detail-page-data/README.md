## Vue项目详情页-动态获取详情页面数据

### 1. 使用Ajax获取动态数据
```html

```

### 2. 解决页面缓存问题

> src/App.vue

```html
<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- 第一次访问路由时，就把该路由对应的内容放在内存中，下一次请求直接从内存取出 -->
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
  </div>
</template>

```


### 3. 解决多个页面滚动的相关影响

> src/router/index.js

```js
export default new Router({
  routes: [{
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/city',
    name: 'City',
    component: City
  }, {
    path: '/detail/:id',
    name: 'Detail',
    component: Detail
  }],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

```
