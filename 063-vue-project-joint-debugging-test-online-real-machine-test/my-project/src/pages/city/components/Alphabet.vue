<template>
  <ul class="list">
    <!-- 1. 定义click点击 -->
    <!-- v-for="(item, key) of cities" -->
    <li
      class="item"
      v-for="item of letters"
      :key="item"
      :ref="item"
      @touchstart.prevent="handelTouchStart"
      @touchmove="handelTouchMove"
      @touchend="handelTouchEnd"
      @click="handelLetterClick"
    >
      {{item}}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'CityAlphabet',
  props: {
    cities: Object
  },
  data () {
    return {
      touchStatus: false,
      startY: 0
    }
  },
  computed: {
    letters () {
      const letters = []
      for (let i in this.cities) {
        letters.push(i)
      }
      return letters
    }
  },
  updated () {
    // 0x02. 当页面更新的时候同时完整自己渲染后，然后钩子更新this.startY
    this.startY = this.$refs['A'][0].offsetTop
  },
  methods: {
    handelLetterClick (e) {
      // 2. 拿到click事件内容
      // console.log(e.target.innerText)
      // 3. 触发事件, 传递消息
      this.$emit('change', e.target.innerText)
      // 4. 在city.vue中监听该事件
    },
    handelTouchStart () {
      // console.log('handelTouchStart')
      this.touchStatus = true
    },
    handelTouchMove (e) {
      // console.log('handelTouchMove')
      if (this.touchStatus) {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        //  0x02. 如果正在执行一件事，那么我延迟16ms执行.如果在16ms之间，你又做了某件事，那么久清除掉上一件事，执行这一次要做的事情。使用setTimeout进行函数截流的方式来优化当前函数的执行频率，从而提高网页的性能
        this.timer = setTimeout(() => {
          // 0x01. 由于startY值是固定的，但是每次拖动都需要重新计算
          // const startY = this.$refs['A'][0].offsetTop
          const touchY = e.touches[0].clientY - 79
          const index = Math.floor((touchY - this.startY) / 20)
          if (index >= 0 && index < this.letters.length) {
            // console.log(this.letters[index])
            this.$emit('change', this.letters[index])
          }
        }, 16)
      }
    },
    handelTouchEnd () {
      // console.log('handelTouchEnd')
      this.touchStatus = false
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/varibles.styl'
  .list
    /* 垂直列居中 */
    display: flex
    flex-direction: column
    justify-content: center
    position: absolute
    top: 1.58rem
    right: 0
    bottom: 0
    width: .4rem
    /* background: red */
    .item
      line-height: .4rem
      text-align: center
      color: $bgColor
</style>
