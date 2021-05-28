## Vue项目使用Vuex实现数据共享

### Vue项目共享数据方案
- 方案1:
> vue总线: vue.bus

- 方案2:
> 数据框架: vuex

> vuex框架图

![](http://images.sharelinux.com/autoUpload/vuex.png)

### vuex安装和使用
> vuex安装
```sh
npm install vuex --save
```

> vuex使用
```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
```

> 项目代码使用vuex存储
>> src/store/index.js
```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 返回一个vuex仓库
export default new Vuex.Store({
  state: {
    city: '北京'
  }
})
```

>>

### 使用Vuex实现数据共享 (首页和城市选择页数据共享)
1. 先定义vuex组件实例化
2. 把vuex实例，注册导入vue组件中
3. 使用和修改vuex中的store存储共享数据

> vuex组件实例化 src/store/index.js
```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 返回一个vuex仓库
export default new Vuex.Store({
  // state存储全局公用数据
  state: {
    city: '北京'
  },
  actions: {
    changeCity (ctx, city) {
      // console.log('vuex actions' + ': ' + city)
      // 0x005 actions通过commit方法调用mutations
      ctx.commit('changeCity', city)
    }
  },
  mutations: {
    changeCity (state, city) {
      // console.log('vuex mutations' + ' ' + city)
      // 0x006 改变state中存储的共享数据
      state.city = city
    }
  }
})
```

> 把vuex实例，注册导入vue组件中 src/main.js
```js
import store from './store'

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
```

> Header页面使用vuex中的store存储共享数据 src/pages/city/components/Header.vue
```html
<template>
  <div class="header">
    <div class="header-left">
        <div class="iconfont back-icon">&#xe624;</div>
    </div>

    <div class="header-input">
      <span class="iconfont">&#xe632;</span>
      输入城市/景点/游玩主题
    </div>
    <router-link to='/city'>
      <div class="header-right">
        <!-- {{this.city}} -->
        <!-- 0x001 获取store组件实例中公用组件的city -->
        {{this.$store.state.city}}
        <span class="iconfont arrow-icon">&#xe6aa;</span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'HomeHeader'
  // 2. 通过props接收父组件传递的值
  // props: {
  //   city: String
  // }
}
</script>
```

> 城市列表页面使用和修改vuex中存储的共享数据 src/pages/city/components/List.vue
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
            <!-- 0x002 使用store存储的city -->
            <div class="button">{{this.$store.state.city}}</div>
          </div>
        </div>
      </div>
      <div class="area">
        <div class="title border-topbottom">热门城市</div>
        <div class="button-list">
          <!-- 0x003 绑定click事件 -->
          <div
            class="button-wrapper"
            v-for="item of hot"
            :key="item.id"
            @click="handleCityClick(item.name)"
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
  methods: {
    handleCityClick (city) {
      // console.log(city)
      // 0x004 调用vuex中的dispatch方法
      this.$store.dispatch('changeCity', city)
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

> Search页面使用、修改vuex中存储的共享数据
```html
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
      this.$store.commit('changeCity', city)
    }
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
```


### 参考链接
- Ref: https://vuex.vuejs.org/zh/
- Ref: https://router.vuejs.org/zh/
- Ref: https://router.vuejs.org/zh/installation.html
