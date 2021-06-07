<template>
  <div>
    <div class="search">
      <!-- 1. 数据双向绑定 -->
      <input v-model="keyword" class="search-input" type="text" placeholder="输入城市名或拼音">
    </div>
    <!-- 8. 解决未搜索或搜索关键字为空时，显示城市选择页面 -->
    <div
      ref="search"
      class="search-content"
      v-show="keyword"
    >
      <ul>
        <!-- 6. 循环显示搜索结果内容-->
        <li
          class="search-item border-bottom"
          v-for="item of list"
          :key="item.id"
          @click="handleCityClick(item.name)"
        >
          {{item.name}}
        </li>
        <!-- 7. 优化显示页面效果,没有匹配项时页面信息展示 -->
        <!-- <li v-show="!(list.length)" class="search-item border-bottom"> -->
        <!-- 8. 剔除逻辑控制代码，使用计算属性 -->
        <li v-show="hasNoData" class="search-item border-bottom">
          没有找到匹配数据
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import BScroll from 'better-scroll'
export default {
  name: 'CitySearch',
  // 2. 接收city父组件传递的cities数据
  props: {
    cities: Object
  },
  data () {
    return {
      keyword: '',
      list: [],
      timer: null
    }
  },
  methods: {
    handleCityClick (city) {
      this.changeCity(city)
      // 使用vue router进行路由跳转
      this.$router.push('/')
    },
    ...mapMutations(['changeCity'])
  },
  watch: {
    // 3. 监听keyword改变
    keyword () {
      // 4. 使用截流函数，从而提高执行效率
      if (this.timer) {
        clearTimeout(this.timer)
      }
      // 7. 关键字清空恢复清除list即可
      if (!this.keyword) {
        // console.log('keyword is empty')
        this.list = []
        return
      }
      this.timer = setTimeout(() => {
        const result = []
        // 5. 具体实现搜索功能
        for (let i in this.cities) {
          this.cities[i].forEach((value) => {
            // console.log(value)
            if (value.spell.indexOf(this.keyword) > -1 || value.name.indexOf(this.keyword) > -1) {
              result.push(value)
            }
          })
        }
        this.list = result
      }, 100)
    }
  },
  computed: {
    hasNoData () {
      return !this.list.length
    }
  },
  mounted () {
    // 6. 优化在搜索出很多结果时可以进行上下滚动
    this.scroll = new BScroll(this.$refs.search)
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/varibles.styl'
  .search
    height: .72rem
    padding: 0 .1rem
    background: $bgColor
    .search-input
      box-sizing: border-box
      width: 100%
      height: .62rem
      padding: 0 .1rem
      line-height: .62rem
      text-align: center
      border-radius: .06rem
      color: #666
  .search-content
    z-index: 1
    overflow: hidden
    position: absolute
    top: 1.58rem
    left: 0
    right: 0
    bottom: 0
    background: #eee
    .search-item
      line-height: .62rem
      padding-left: .2rem
      background: #fff
      color: #666
</style>
