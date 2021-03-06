## Vue项目城市选择页-页面的动态数据渲染

### 1. 热门城市信息数据动态获取
> src/pages/city/components/List.vue 中声明和渲染数据
```html
<template>
  <!-- 0. 需要注意数据嵌套层级 -->
  <!-- 1. 通过ref获取当前dom元素索引 -->
  <div class="list" ref="wrapper">
    <div>
      <div class="area">
        <div class="title border-topbottom">热门城市</div>
        <div class="button-list">
          <div
            class="button-wrapper"
            v-for="item of hot"
            :key="item.id"
          >
            <div class="button">{{item.name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="area" v-for="(item, key) in cities" :key="key">
    <div class="title border-topbottom">{{key}}</div>
    <div class="item-list">
      <div
        class="item border-bottom"
        v-for="innerItem in item"
        :key="innerItem.id"
      >
          {{innerItem.name}}
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'CityList',
  props: {
    hot: Array,
    cities: Object
  },
  watch: {
    // 解决better-scroll数据动态加载后不能滚动
    cities () {
      this.$nextTick(() => {
        // console.log('watch cities')
        this.scroll = new BScroll(this.$refs.wrapper)
      })
    }
  },
  mounted () {
    // console.log('mounted BScroll')
    // 2. 以参数形式传入当前dom元素给BScroll组件
    this.scroll = new BScroll(this.$refs.wrapper)
  }
}
</script>
```

### 2.城市信息数据动态获取
> src/pages/city/components/List.vue 中声明和渲染数据
```html
<template>
  <!-- 0. 需要注意数据嵌套层级 -->
  <!-- 1. 通过ref获取当前dom元素索引 -->
  <div class="list" ref="wrapper">
    <div>
      <div class="area">
        <div class="title border-topbottom">当前城市</div>
        <div class="button-list">
          <div class="button-wrapper">
            <div class="button">北京</div>
          </div>
        </div>
      </div>
      <div class="area">
        <div class="title border-topbottom">热门城市</div>
        <div class="button-list">
          <div
            class="button-wrapper"
            v-for="item of hot"
            :key="item.id"
          >
            <div class="button">{{item.name}}</div>
          </div>
        </div>
      </div>
      <div class="area" v-for="(item, key) in cities" :key="key">
        <div class="title border-topbottom">{{key}}</div>
        <div class="item-list">
          <div
            class="item border-bottom"
            v-for="innerItem in item"
            :key="innerItem.id"
          >
              {{innerItem.name}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'CityList',
  props: {
    hot: Array,
    cities: Object
  },
  watch: {
    // 解决better-scroll数据动态加载后不能滚动
    // 方案1
    // cities () {
    //   this.$nextTick(() => {
    //     // console.log('watch cities')
    //     this.scroll = new BScroll(this.$refs.wrapper)
    //   })
    // },
    // 方案2 (推荐)
    cities () {
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.wrapper, {
            click: true
          })
        } else {
          this.scroll.refresh()
        };
      })
    }
  },
  mounted () {
    // console.log('mounted BScroll')
    // 2. 以参数形式传入当前dom元素给BScroll组件
    this.scroll = new BScroll(this.$refs.wrapper)
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/varibles.styl'
  .border-topbottom
  &:before
    border-color: #ccc
  &:after
    border-color: #ccc
  .list
    overflow: hidden
    position: absolute
    top: 1.58rem
    left: 0
    right: 0
    bottom: 0
    .title
      line-height: .54rem
      background: #eee
      padding-left: .2rem
      color: #666
      font-size: .26rem
    .button-list
      overflow: hidden
      padding: .1rem .6rem .1rem .1rem
      .button-wrapper
        float: left
        width: 33.33%
        .button
          margin: .1rem
          padding: .1rem 0
          text-align: center
          border: .02rem solid #ccc
          border-radius: .06rem
    .item-list
      .item
        line-height: .76rem
        color: #666
        padding-left: .2rem
    .border-bottom
    &:before
      border-color: #ccc
</style>
```

### 问题解决参考
- Ref: https://www.jianshu.com/p/e65c747ad702
- Ref: https://blog.csdn.net/qiqi_77_/article/details/79361413
- Ref: https://blog.csdn.net/weixin_44166439/article/details/113779329
