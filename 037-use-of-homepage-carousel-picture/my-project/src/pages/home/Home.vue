<template>
   <div>
    <home-header></home-header>
    <home-swiper></home-swiper>
    <!-- Hello World -->
  </div>
</template>

<script>
import HomeHeader from './components/Header'
import HomeSwiper from './components/Swiper'
export default {
  name: 'Home',
  components: {
    HomeHeader,
    HomeSwiper
  }
}
</script>

<style type="text/css"></style>
