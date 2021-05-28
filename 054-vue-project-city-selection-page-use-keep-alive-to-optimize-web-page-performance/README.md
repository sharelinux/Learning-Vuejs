## Vue项目城市选择页-使用keep-alive优化网页性能

### 1. 优化两个页面的性能

> 使用keep-alive组件对路由对应的内容进行内存缓存

```html
<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- 第一次访问路由时，就把该路由对应的内容放在内存中，下一次请求直接从内存取出 -->
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
```

> 使用keep-alive新增的activated生命周期函数，进行首页页面更新

```html
<template>
   <div>
    <!-- 1. 父组件通过属性绑定给子组件传值 -->
    <home-header></home-header>
    <home-swiper :list="swiperList"></home-swiper>
    <home-icons :list="iconList"></home-icons>
    <home-recommend :list="recommendList"></home-recommend>
    <home-weekend :list="weekendList"></home-weekend>
    <!-- Hello World -->
  </div>
</template>

<script>
import HomeHeader from './components/Header'
import HomeSwiper from './components/Swiper'
import HomeIcons from './components/Icons'
import HomeRecommend from './components/Recommend'
import HomeWeekend from './components/Weekend'
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    HomeHeader,
    HomeSwiper,
    HomeIcons,
    HomeRecommend,
    HomeWeekend
  },
  data () {
    return {
      lastCity: '',
      swiperList: [],
      iconList: [],
      recommendList: [],
      weekendList: []
    }
  },
  methods: {
    gethomeInfo () {
      // console.log('gethomeInfo')
      axios.get('/api/index.json?city=' + this.city)
        .then(this.getHomeInfoSucc)
    },
    getHomeInfoSucc (res) {
      // console.log(res)
      res = res.data
      if (res.ret && res.data) {
        const data = res.data
        // console.log(data.city)
        // this.city = data.city
        this.swiperList = data.swiperList
        this.iconList = data.iconList
        this.recommendList = data.recommendList
        this.weekendList = data.weekendList
      };
      // console.log('#city:' + this.city)
    }
  },
  computed: {
    ...mapState(['city'])
  },
  mounted () {
    this.gethomeInfo()
    this.lastCity = this.city
    // console.log('home mounted')
  },
  activated () {
    // console.log('home activated')
    if (this.lastCity !== this.city) {
      this.lastCity = this.city
      this.gethomeInfo()
    }
  }
}
</script>

<style type="text/css"></style>

```
