## Vue项目首页 - 图标区域页面布局

### 1. 把icons组件添加至Home组件中
```html
<template>
   <div>
    <home-header></home-header>
    <home-swiper></home-swiper>
    <home-icons></home-icons>
    <!-- Hello World -->
  </div>
</template>

<script>
import HomeHeader from './components/Header'
import HomeSwiper from './components/Swiper'
import HomeIcons from './components/Icons'
export default {
  name: 'Home',
  components: {
    HomeHeader,
    HomeSwiper,
    HomeIcons
  }
}
</script>

<style type="text/css"></style>
```


### 2. icons.vue布局站位代码
```html
<template>
  <div class="icons">
    <div class="icon">
      <div class="icon-img">
        <img src="https://imgs.qunarzz.com/piao/fusion/1611/54/ace00878a52d9702.png"
        class="icon-img-content" />
      </div>
      <p class="icon-desc">热门景点</p>
    </div>
    <div class="icon">
      <div class="icon-img">
        <img src="https://imgs.qunarzz.com/piao/fusion/1611/54/ace00878a52d9702.png"
        class="icon-img-content" />
      </div>
      <p class="icon-desc">热门景点</p>
    </div>
    <div class="icon">
      <div class="icon-img">
        <img src="https://imgs.qunarzz.com/piao/fusion/1611/54/ace00878a52d9702.png"
        class="icon-img-content" />
      </div>
      <p class="icon-desc">热门景点</p>
    </div>
    <div class="icon">
      <div class="icon-img">
        <img src="https://imgs.qunarzz.com/piao/fusion/1611/54/ace00878a52d9702.png"
        class="icon-img-content" />
      </div>
      <p class="icon-desc">热门景点</p>
    </div>
    <div class="icon">
      <div class="icon-img">
        <img src="https://imgs.qunarzz.com/piao/fusion/1611/54/ace00878a52d9702.png"
        class="icon-img-content" />
      </div>
      <p class="icon-desc">热门景点</p>
    </div>
    <div class="icon">
      <div class="icon-img">
        <img src="https://imgs.qunarzz.com/piao/fusion/1611/54/ace00878a52d9702.png"
        class="icon-img-content" />
      </div>
      <p class="icon-desc">热门景点</p>
    </div>
    <div class="icon">
      <div class="icon-img">
        <img src="https://imgs.qunarzz.com/piao/fusion/1611/54/ace00878a52d9702.png"
        class="icon-img-content" />
      </div>
      <p class="icon-desc">热门景点</p>
    </div>
    <div class="icon">
      <div class="icon-img">
        <img src="https://imgs.qunarzz.com/piao/fusion/1611/54/ace00878a52d9702.png"
        class="icon-img-content" />
      </div>
      <p class="icon-desc">热门景点</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeIcons'
}
</script>

<style lang="stylus" scoped>
  @import '~styles/varibles.styl';
  .icons
    overflow: hidden
    height: 0
    padding-bottom: 50%
    .icon
      position relative
      overflow: hidden
      float left
      width: 25%
      height: 0
      padding-bottom: 25%
      .icon-img
        position: absolute
        top: 0
        left: 0
        right: 0
        bottom: .44rem
        box-sizing: border-box
        padding: .1rem
        .icon-img-content
          display block
          margin: 0 auto
          height: 100%
      .icon-desc
        position: absolute
        left: 0
        right: 0
        bottom: 0
        height: .44rem
        line-height: .44rem
        text-align: center
        color: $darkTextColor
</style>
```
