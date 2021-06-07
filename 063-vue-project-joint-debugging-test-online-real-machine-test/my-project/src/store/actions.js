export default {
  changeCity (ctx, city) {
    // console.log('vuex actions' + ': ' + city)
    // 0x005 actions通过commit方法调用mutations
    ctx.commit('changeCity', city)
  }
}
