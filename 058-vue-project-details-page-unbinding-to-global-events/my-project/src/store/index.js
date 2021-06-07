import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

// 返回一个vuex仓库
export default new Vuex.Store({
  // state存储全局公用数据
  state,
  actions,
  mutations,
  getters: {
    // 类似于计算属性，避免数据冗余
    doubleCity (state) {
      return state.city + ' ' + state.city
    }
  }
})
