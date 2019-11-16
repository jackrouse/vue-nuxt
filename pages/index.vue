<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">
        my-nuxt-blog1
      </h1>
      <h2 class="subtitle">
        My legendary Nuxt.js project
      </h2>
      <nuxt-link to="/about">about</nuxt-link>
      <div v-for="item in res.heroList" :key="item._id">
        <div>{{ item.heroName }}</div>
        <div>{{ item.heroSex }}</div>
        <div>{{ item.favourite }}</div>
        <div>{{ item.age }}</div>
        <img v-for="(i, index) in item.imgArr" :src="i" :key="index" alt="" />
      </div>
      <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" class="button--green">
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  async asyncData({ $axios }) {
    const res = await $axios.$post('/hero/getHeroList')
    return { res }
  }

  // asyncData(params) {
  //   return {
  //     name: 123
  //   }
  // }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
