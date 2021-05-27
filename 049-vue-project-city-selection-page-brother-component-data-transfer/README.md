## Vue项目城市选择页-兄弟组件数据传递

### 1. 字母表点击关联城市列表联动

> 1. 先从字母表获取字母点击事件，然后通过事件传递给父组件 city.vue
> 2. 父组件通过属性绑定传递给list.vue数据，letter字段
> 3. list.vue声明接收letter数据, 然后操作通过this.scroll.scrollToElement(element)，滚动到该dom元素所在位置

```html
<!-- 1. src/pages/city/components/Alphabet.vue -->

<template>
  <ul class="list">
    <!-- 1. 定义click点击 -->
    <li
      class="item"
      v-for="(item, key) of cities"
      :key="key"
      @click="handelLetterClick"
    >
      {{key}}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'CityAlphabet',
  props: {
    cities: Object
  },
  methods: {
    handelLetterClick (e) {
      // 2. 拿到click事件内容
      // console.log(e.target.innerText)
      // 3. 触发事件, 传递消息
      this.$emit('change', e.target.innerText)
      // 4. 在city.vue中监听该事件
    }
  }
}
</script>


<!-- 2. src/pages/city/City.vue -->

<template>
  <div>
    <city-header></city-header>
    <city-search></city-search>
    <!-- 6. 属性绑定的方式把letter数据传递给子组件 -->
    <city-list
      :cities="cities"
      :hot="hotCities"
      :letter="letter"
    >
    </city-list>
    <city-alphabet
      :cities="cities"
      @change="handelLetterChange"
    >
    </city-alphabet>
  </div>
</template>

<script>
import axios from 'axios'
import CityHeader from './components/Header'
import CitySearch from './components/Search'
import CityList from './components/List'
import CityAlphabet from './components/Alphabet'
export default {
  name: 'City',
  // 注册局部组件
  components: {
    CityHeader,
    CitySearch,
    CityList,
    CityAlphabet
  },
  data () {
    return {
      cities: {},
      hotCities: [],
      letter: ''
    }
  },
  methods: {
    getCityInfo () {
      // console.log('getCityInfo')
      axios.get('/api/city.json')
        .then(this.handelGetCityInfoSucc)
    },
    handelGetCityInfoSucc (res) {
      // console.log(res)
      res = res.data
      if (res.ret && res.data) {
        const data = res.data
        this.cities = data.cities
        this.hotCities = data.hotCities
      }
    },
    handelLetterChange (letter) {
      // console.log(letter)
      // 5. 修改letter数据信息
      this.letter = letter
    }
  },
  mounted () {
    // console.log('city mounted')
    this.getCityInfo()
  }
}
</script>


<!-- 3. src/pages/city/components/List.vue -->

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
```


### 2. 字母表上下拖动关联城市列表联动

      :ref="item"
      @touchstart="handelTouchStart"
      @touchmove="handelTouchMove"
      @touchend="handelTouchEnd"

> 1. 定义touchstart、touchmove、touchend事件，并关联对应的方法，定义touchStatus状态标签
> 2. 通过计算A字母距离顶端位置，然后计算拖动后的位置和A字表相对的距离，除以每个字母的高度，就是偏离字母元素的个数，也是字母数组的当前索引位置。

```html
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

```
