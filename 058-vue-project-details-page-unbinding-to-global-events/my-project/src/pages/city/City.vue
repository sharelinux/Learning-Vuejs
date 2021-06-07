<template>
  <div>
    <city-header></city-header>
    <city-search :cities="cities"></city-search>
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

<style lang="stylus" scoped>

</style>
