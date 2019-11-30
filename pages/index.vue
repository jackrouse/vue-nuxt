<template>
  <div class="page-container">
    <div class="bg-main" alt="" />
    <div class="home">
      <nuxt-link to="/about">about</nuxt-link>
      <div v-for="item in res.heroList" :key="item._id">
        <div>{{ item.heroName }}</div>
        <div>{{ item.heroSex }}</div>
        <div>{{ item.favourite }}</div>
        <div>{{ item.age }}</div>
        <img v-for="(i, index) in item.imgArr" :src="i" :key="index" alt="" />
      </div>

      <!-- <svg-icon name="qq" /> -->
      <!-- <img src="~/assets/sprite/svg/yun.svg" alt="" /> -->
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  async asyncData({ $axios }) {
    const res = await $axios.$post('/api/hero/getHeroList')
    return { res }
  }

  // asyncData(params) {
  //   return {
  //     name: 123
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.bg-main {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: url('~assets/images/trianglify.svg') no-repeat center;
  background-size: cover;
}
.home {
  height: calc(100vh - 61px);
}
</style>
