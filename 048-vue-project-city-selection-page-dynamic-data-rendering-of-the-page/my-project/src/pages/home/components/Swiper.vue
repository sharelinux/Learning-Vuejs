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
