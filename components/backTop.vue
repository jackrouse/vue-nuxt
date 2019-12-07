<template>
  <transition name="el-fade-in-linear">
    <div v-show="visible" class="backtop">
      <el-button
        @click="backTop"
        type="primary"
        icon="el-icon-arrow-up"
        plain
        circle
      ></el-button>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    visibilityHeight: {
      type: Number,
      default: 400
    }
  },
  data: () => ({
    visible: false
  }),
  created() {
    if (process.client) {
      this.backTop()
    }
    // console.log(document.body.scrollTop)
  },
  // mounted() {
  //   console.log(document.body.scrollTop)
  // },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.visible = window.pageYOffset > this.visibilityHeight
    },
    backTop() {
      // document.documentElement.scrollTop = 0
      // document.body.scrollTop = 0
      this.$scrollTo('body')
    }
  }
}
</script>

<style scoped>
.backtop {
  position: fixed;
  right: 10px;
  bottom: 10px;
  opacity: 0.6;
}
</style>
