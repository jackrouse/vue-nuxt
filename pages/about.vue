<template>
  <div class="container">
    <div>
      <logo />
      about
      <nuxt-link to="/">index</nuxt-link>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  }
  // async asyncData({ $axios }) {
  //   const res = await $axios.$post('http://localhost:3000/hero/getHeroList')
  //   return { res }
  // }

  // asyncData(params) {
  //   return {
  //     name: 123
  //   }
  // }
}
</script>

<style></style>
