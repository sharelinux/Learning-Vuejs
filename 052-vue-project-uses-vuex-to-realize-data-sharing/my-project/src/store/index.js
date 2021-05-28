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
