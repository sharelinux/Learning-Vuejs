## Vue项目首页 - 图标区域逻辑实现

### 1. 从HTML进行数据抽离和使用
```html
<!-- 1.1 将出具抽离至data函数-->
<script>
export default {
  name: 'HomeIcons',
  data () {
    return {
      iconList: [{
        id: '0001',
        imgUrl: 'https://imgs.qunarzz.com/piao/fusion/1611/54/ace00878a52d9702.png',
        desc: '景点门票'
      }, {
        id: '0002',
        imgUrl: 'https://imgs.qunarzz.com/piao/fusion/1711/df/86cbcfc533330d02.png',
        desc: '滑雪季'
      }, {
        id: '0003',
        imgUrl: 'https://imgs.qunarzz.com/piao/fusion/1710/a6/83f636bd75ae6302.png',
        desc: '泡温泉'
      }, {
        id: '0004',
        imgUrl: 'https://imgs.qunarzz.com/piao/fusion/1611/35/2640cab202c41b02.png',
        desc: '动植园'
      }, {
        id: '0005',
        imgUrl: 'https://imgs.qunarzz.com/piao/fusion/1611/54/ace00878a52d9702.png',
        desc: '景点门票'
      }, {
        id: '0006',
        imgUrl: 'https://imgs.qunarzz.com/piao/fusion/1711/df/86cbcfc533330d02.png',
        desc: '滑雪季'
      }, {
        id: '0007',
        imgUrl: 'https://imgs.qunarzz.com/piao/fusion/1710/a6/83f636bd75ae6302.png',
        desc: '泡温泉'
      }, {
        id: '0008',
        imgUrl: 'https://imgs.qunarzz.com/piao/fusion/1611/35/2640cab202c41b02.png',
        desc: '动植园'
      }, {
        id: '0009',
        imgUrl: 'https://imgs.qunarzz.com/piao/fusion/1611/a9/ffc620dbda9b9c02.png',
        desc: '一日游'
      }]
    }
  }
}
</script>

<!-- 2. 使用data中定义的数据 -->
<div
    class="icon"
    v-for="item of iconList"
    :key="item.id">
        <div class="icon-img">
            <img :src="item.imgUrl" class="icon-img-content" />
        </div>
    <p class="icon-desc">{{item.desc}}</p>
</div>
```


### 2. 使用vue计算属性，进行数据分页显示
```html
<template>
  <div class="icons">
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide v-for="(page, index) of pages"
      :key="index">
        <div
          class="icon"
          v-for="item of page"
          :key="item.id"
        >
          <div class="icon-img">
            <img :src="item.imgUrl"
            class="icon-img-content" />
          </div>
          <p class="icon-desc">{{item.desc}}</p>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'HomeIcons',
  data () {
    return {
      iconList: [{
        id: '0001',
        imgUrl: 'https://imgs.qunarzz.com/piao/fusion/1611/54/ace00878a52d9702.png',
        desc: '景点门票'
      }, {
        id: '0002',
        imgUrl: 'https://imgs.qunarzz.com/piao/fusion/1711/df/86cbcfc533330d02.png',
        desc: '滑雪季'
      }, {
        id: '0003',
        imgUrl: 'https://imgs.qunarzz.com/piao/fusion/1710/a6/83f636bd75ae6302.png',
        desc: '泡温泉'
      }, {
        id: '0004',
        imgUrl: 'https://imgs.qunarzz.com/piao/fusion/1611/35/2640cab202c41b02.png',
        desc: '动植园'
      }, {
        id: '0005',
        imgUrl: 'https://imgs.qunarzz.com/piao/fusion/1611/54/ace00878a52d9702.png',
        desc: '景点门票'
      }, {
        id: '0006',
        imgUrl: 'https://imgs.qunarzz.com/piao/fusion/1711/df/86cbcfc533330d02.png',
        desc: '滑雪季'
      }, {
        id: '0007',
        imgUrl: 'https://imgs.qunarzz.com/piao/fusion/1710/a6/83f636bd75ae6302.png',
        desc: '泡温泉'
      }, {
        id: '0008',
        imgUrl: 'https://imgs.qunarzz.com/piao/fusion/1611/35/2640cab202c41b02.png',
        desc: '动植园'
      }, {
        id: '0009',
        imgUrl: 'https://imgs.qunarzz.com/piao/fusion/1611/a9/ffc620dbda9b9c02.png',
        desc: '一日游'
      }]
    }
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    pages () {
      const pages = []
      this.iconList.forEach((item, index) => {
        const page = Math.floor(index / 8)
        if (!pages[page]) {
          pages[page] = []
        }
        pages[page].push(item)
      })
      return pages
    }
  }
}
</script>
```

### 3. 优化字体标签过长问题以及样式组件抽离

```html
<!-- 1. 在assets/styles/minins.styl 定义通用样式 -->
ellipsis()
  overflow: hidden
  white-space: nowrap
  text-overflow: ellipsis

<!-- 2. 在对应位置导入该组件, 并调用该方法 -->
<style lang="stylus" scoped>
  @import '~styles/varibles.styl';
  @import '~styles/mixins.styl';
      ellipsis()
</style>
```
