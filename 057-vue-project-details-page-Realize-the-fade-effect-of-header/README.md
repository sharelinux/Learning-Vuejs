## Vue项目详情页-实现Header渐隐渐显效果

### 1. 滚动窗口自动隐藏
> src/pages/detail/components/Header.vue

```html
<template>
  <div>
    <router-link
      v-show="showAbs"
      tag="div"
      to="/"
      class="header-abs"
    >
        <div class="iconfont header-abs-back">&#xe624;</div>
    </router-link>
    <div class="header-fixed" v-show="!showAbs">
      <router-link to="/">
        <div class="iconfont header-fixed-back">&#xe624;</div>
      </router-link>
      景点详情
    </div>
    <div class="content"></div>
  </div>
</template>

<script>
export default {
  name: 'DetailHeader',
  data () {
    return {
      showAbs: true
    }
  },
  methods: {
    handelScroll () {
      const top = document.documentElement.scrollTop
      // 1. 滚动高度大于60px, 显示城市详情top菜单
      if (top > 60) {
        this.showAbs = false
      } else {
        this.showAbs = true
      }
    }
  },
  activated () {
    // 注册窗口滚事件
    window.addEventListener('scroll', this.handelScroll)
  }
}
</script>

```

### 2. 渐隐渐现
> src/pages/detail/components/Header.vue

```html
<template>
  <div>
    <router-link
      v-show="showAbs"
      tag="div"
      to="/"
      class="header-abs"
    >
        <div class="iconfont header-abs-back">&#xe624;</div>
    </router-link>
    <!-- 绑定动态style -->
    <div
      class="header-fixed"
      v-show="!showAbs"
      :style="opacityStyle"
    >
      <router-link to="/">
        <div class="iconfont header-fixed-back">&#xe624;</div>
      </router-link>
      景点详情
    </div>
    <div class="content"></div>
  </div>
</template>

<script>
export default {
  name: 'DetailHeader',
  data () {
    return {
      showAbs: true,
      opacityStyle: {
        opacity: 0
      }
    }
  },
  methods: {
    handelScroll () {
      // console.log(document.documentElement.scrollTop)
      // 1. 滚动高度大于60px, 显示城市详情top菜单
      const top = document.documentElement.scrollTop
      // 2. 当高度大于60小于140时实现渐隐渐现的效果
      if (top > 60) {
        let opacity = top / 140
        // 大于140时，opacity最大赋值为1
        opacity = opacity > 1 ? 1 : opacity
        this.opacityStyle = { opacity }
        this.showAbs = false
      } else {
        this.showAbs = true
      }
    }
  },
  activated () {
    // 注册窗口滚事件
    window.addEventListener('scroll', this.handelScroll)
  }
}
</script>
```
