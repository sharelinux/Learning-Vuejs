## 首页轮播图

### 使用vue-awesome-swiper进行制作轮播图


1. 安装vue-awesome-swiper轮播图插件
```sh
npm install vue-awesome-swiper --save
npm install swiper --save
```

2. 注册vue-awesome-swiper全局组件
```js
import VueAwesomeSwiper from 'vue-awesome-swiper'

// import style (<= Swiper 5.x)
import 'swiper/css/swiper.css'

Vue.use(VueAwesomeSwiper)
```

3. 使用vue-awesome-swiper组件
```html
<template>
  <div class="wrapper">
    <swiper ref="mySwiper" :options="swiperOptions">
    <swiper-slide v-for="item in swiperList" :key="item.id" >
      <img class="swiper-img" :src="item.imgUrl"/>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
  </div>
</template>

<script>
export default {
  name: 'HomeSwiper',
  // eslint-disable-next-line space-before-function-paren
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination',
          loop: true
        }
        // Some Swiper option/callback...
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
    // eslint-disable-next-line space-before-function-paren
    swiper() {
      return this.$refs.mySwiper.$swiper
    }
  },
  // eslint-disable-next-line space-before-function-paren
  mounted() {
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

/*
  .wrapper
    width: 100%
    height: 31.25vw
    .swiper-img
      width: 100%
*/
</style>
```


```html
<!-- Home.vue 组件引用-->
<template>
   <div>
    <home-header></home-header>
    <home-swiper></home-swiper>
    <!-- Hello World -->
  </div>
</template>

<script>
import HomeHeader from './components/Header'
import HomeSwiper from './components/Swiper'
export default {
  name: 'Home',
  components: {
    HomeHeader,
    HomeSwiper
  }
}
</script>

<style type="text/css"></style>
```

4.



- Ref: https://github.com/surmon-china/vue-awesome-swiper
- Ref: https://blog.csdn.net/weixin_46836035/article/details/107647759


