<template>
  <div class="main-container">
    <main-header />
    <nuxt />
    <main-footer />
    <back-top />
  </div>
</template>
<script>
import backTop from '~/components/backTop.vue'
import mainHeader from '~/components/mainHeader.vue'
import mainFooter from '~/components/mainFooter.vue'

// import mainAside from '~/components/mainAside.vue'
export default {
  components: {
    mainHeader,
    mainFooter,
    // mainAside,
    backTop
  }
}
</script>
<style lang="scss" scoped>
.main-container {
  /deep/ {
    .page-container {
      padding-top: $navHeight;
    }
  }
}
</style>
