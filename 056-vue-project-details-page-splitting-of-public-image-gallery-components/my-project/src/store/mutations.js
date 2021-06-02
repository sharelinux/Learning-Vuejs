export default {
  changeCity (state, city) {
    // console.log('vuex mutations' + ' ' + city)
    // 0x006 改变state中存储的共享数据
    state.city = city
    // 设置localStorage
    try {
      localStorage.city = city
    } catch (e) {}
  }
}
