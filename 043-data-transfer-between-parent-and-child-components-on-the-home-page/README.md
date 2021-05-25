## Vue项目主页-首页父子组件间传值

### 1. 首页父子组件间数据传递
> 在home.vue中获取数据，然后通过属性绑定传递个对应子组件

### 2. 父子组件代码功能实现
> 在home.vue中获取数据，通过属性绑定传递个子组件
```html
<!-- home.vue -->
<template>
   <div>
    <!-- 1. 父组件通过属性绑定给子组件传值 -->
    <home-header :city="city"></home-header>
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
      city: '',
      swiperList: [],
      iconList: [],
      recommendList: [],
      weekendList: []
    }
  },
  methods: {
    gethomeInfo () {
      console.log('gethomeInfo')
      axios.get('/api/index.json')
        .then(this.getHomeInfoSucc)
    },
    getHomeInfoSucc (res) {
      // console.log(res)
      res = res.data
      if (res.ret && res.data) {
        const data = res.data
        console.log(data.city)
        this.city = data.city
        this.swiperList = data.swiperList
        this.iconList = data.iconList
        this.recommendList = data.recommendList
        this.weekendList = data.weekendList
      };
      console.log('#city:' + this.city)
    }
  },
  mounted () {
    this.gethomeInfo()
  }
}
</script>

<style type="text/css"></style>

```

> Swiper.vue中申明接收父组件传递的list数据即可
```html
<template>
  <div class="wrapper">
    <!-- v-if有bug 解决默认显示最后一张图片的bug -->
    <!-- v-if div不会渲染 v-show占位但是不显示 -->
    <swiper ref="mySwiper" :options="swiperOptions" v-show="showSwiper">
    <!-- <swiper-slide v-for="item in swiperList" :key="item.id" > -->
    <swiper-slide v-for="item in list" :key="item.id" >
      <img class="swiper-img" :src="item.imgUrl"/>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
  </div>
</template>

<script>
export default {
  name: 'HomeSwiper',
  props: {
    list: Array
  },
  data () {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination',
          loop: true
        }
      },
      swiperList: [{
        id: '0001',
        imgUrl: 'https://imgs.qunarzz.com/piao/fusion/1802/e3/62ce7362ca051d02.jpg_640x200_6db551b7.jpg'}, {
        id: '0002',
        imgUrl: 'https://imgs.qunarzz.com/piao/fusion/1801/93/ce59d182aca07102.jpg_640x200_ba03d44c.jpg'
      }]
    }
  },
  computed: {
    swiper () {
      // console.log(this)
      return this.$refs.mySwiper.$swiper
    },
    showSwiper () {
      return this.list.length
    }
  },
  mounted () {
    console.log('Current Swiper instance object', this.swiper)
    this.swiper.slideTo(3, 1000, false)
  }
}
</script>

<style lang="stylus" scoped>
  /* 样式穿透 */
  .wrapper >>> .swiper-pagination-bullet-active
      background: #fff !important

  .wrapper
    overflow: hidden
    width: 100%
    height: 0
    padding-bottom: 31.25%
    background: #eee

    .swiper-img
      width: 100%
</style>

```

### 杂项
1. vue-awesome-swiper报错
- Ref: https://blog.csdn.net/qq_38941937/article/details/108860555

2. vue mounted方法讲解
- Ref: https://ustbhuangyi.github.io/vue-analysis/v2/data-driven/mounted.html
- Ref: https://zhuanlan.zhihu.com/p/39685427
- Ref: https://blog.csdn.net/xdnloveme/article/details/78035065

3. vue computed计算属性
- Ref: https://cn.vuejs.org/v2/guide/computed.html

4. vue-awesome-swiper相关
- Ref: https://github.com/surmon-china/vue-awesome-swiper
- Ref: https://3.swiper.com.cn/

5. vue computed与mounted执行顺序
> computed优先于mounted执行
