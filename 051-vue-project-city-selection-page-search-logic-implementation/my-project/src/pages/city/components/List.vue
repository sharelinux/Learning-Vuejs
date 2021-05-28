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
      <div
        class="area"
        v-for="(item, key) in cities"
        :key="key"
        :ref="key"
      >
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
  // 7. letter监听数据变换
  props: {
    hot: Array,
    cities: Object,
    letter: String
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
    },
    letter () {
      // console.log(this.letter)
      // 8. 操作scroll组件,滚动到某一个元素上
      if (this.letter) {
        const element = this.$refs[this.letter][0]
        this.scroll.scrollToElement(element)
      }
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
