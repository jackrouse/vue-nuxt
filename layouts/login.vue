<template>
  <el-container class="main-container">
    <nuxt />
  </el-container>
</template>
<script>
// import mainAside from '~/components/mainAside.vue'
export default {
  components: {
    // mainAside,
  }
}
</script>
<style lang="scss" scoped>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

.el-header,
.el-footer {
  /* background-color: #b3c0d1; */
  color: #333;
  /* text-align: center; */
}

.el-aside {
  /* background-color: #d3dce6; */
  /* color: #333; */
  /* text-align: center; */
}
.main-container {
  // height: 100vh;
  // overflow-y: auto;
  // min-height: 600px;
  // height: 100%;
  // background-image: url('~assets/images/yun.svg');
  // background-size: contain;
  // background: url('~assets/images/ye1.svg') fixed top center no-repeat;
  // background-size: cover;
}

.main-footer {
  position: relative;
  min-height: 200px;
  background: linear-gradient(135deg, #012, #221 70%, #332 90%);
  background-size: contain;
  overflow: hidden;
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('https://loading.io/assets/img/c/bg/cloud-dark.svg');
    background-size: cover;
    background-position: top center;
    background-repeat: no-repeat;
  }
  .bg2 {
    position: absolute;
    // margin-bottom: -90px;
    width: 100%;
    top: 20px;
    left: 0;
    height: 200px;
    background-image: url('~assets/images/valley-white.svg');
    background-size: cover;
    transform: translate(0, -50%);
    background-position: center 100%;
    background-repeat: no-repeat;
  }
  // .mark {
  //   width: 100%;
  //   height: 100%;
  //   background-image: url('~assets/images/valley-white.svg');
  //   background-size: cover;
  //   background-position: center center;
  //   background-repeat: no-repeat;
  // }
}

.el-main {
  /* background-color: #e9eef3; */
  color: #333;
  /* text-align: center; */
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}
.page-enter,
.page-live {
  opacity: 0;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(30px, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-30px, 0);
}
</style>
