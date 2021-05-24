## Vue项目主页- 使用axios发送ajax请求

### 通过Ajax动态获取首页数据
> 组件
- fetch
- vue-resource
- axios (推荐使用)


### 1. 安装axios
```sh
npm install axios --save
```


### 2. npm 请求后端数据
```html
<script>
import HomeHeader from './components/Header'
import HomeSwiper from './components/Swiper'
import HomeIcons from './components/Icons'
import HomeRecommend from './components/Recommend'
import HomeWeekend from './components/Weekend'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    HomeHeader,
    HomeSwiper,
    HomeIcons,
    HomeRecommend,
    HomeWeekend
  },
  mounted () {
    this.gethomeInfo()
  },
  methods: {
    gethomeInfo () {
      console.log('gethomeInfo')
      axios.get('/api/index.json')
        .then(this.getHomeInfoSucc)
    },
    getHomeInfoSucc (res) {
      console.log(res)
    }
  }
}
</script>
```


### 3. 模拟后端数据
```js
// 在my-project/config/index.js配置请求转发代理
module.exports = {
  dev: {
    //  配置webpack-dev-server开发环境转发代理
    proxyTable: {
      '/api': {
        target: 'http://localhost:8080',
        pathRewrite: {
          '^/api': 'static/mock'
        }
      }
    },
}
```


### npm相关命令
```
# npm 清理缓存
npm cache clean --force

# 误删node_modules后如何下载
> 重新下载package.json中node的模块生成node_modules目录
npm install

# 安装webpack、webpack-cli、webpack-dev-server
npm install --save-dev webpack webpack-cli webpack-dev-server
```
