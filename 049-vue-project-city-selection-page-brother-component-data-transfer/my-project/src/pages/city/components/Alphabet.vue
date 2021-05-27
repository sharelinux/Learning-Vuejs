<template>
  <ul class="list">
    <!-- 1. 定义click点击 -->
    <!-- v-for="(item, key) of cities" -->
    <li
      class="item"
      v-for="item of letters"
      :key="item"
      :ref="item"
      @touchstart="handelTouchStart"
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
      touchStatus: false
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
  methods: {
    handelLetterClick (e) {
      // 2. 拿到click事件内容
      // console.log(e.target.innerText)
      // 3. 触发事件, 传递消息
      this.$emit('change', e.target.innerText)
      // 4. 在city.vue中监听该事件
    },
    handelTouchStart () {
      console.log('handelTouchStart')
      this.touchStatus = true
    },
    handelTouchMove (e) {
      console.log('handelTouchMove')
      if (this.touchStatus) {
        const startY = this.$refs['A'][0].offsetTop
        const touchY = e.touches[0].clientY - 79
        const index = Math.floor((touchY - startY) / 20)
        // console.log(startY)
        // console.log(touchY)
        // console.log(index)
        if (index >= 0 && index < this.letters.length) {
          // console.log(this.letters[index])
          this.$emit('change', this.letters[index])
        }
      }
    },
    handelTouchEnd () {
      console.log('handelTouchEnd')
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
