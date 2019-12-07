<template>
  <div class="page-container layout-wrap">
    <div class="bg-main" alt="" />
    <!-- <nuxt-link to="/about">about</nuxt-link>
      <div v-for="item in res.heroList" :key="item._id">
        <div>{{ item.heroName }}</div>
        <div>{{ item.heroSex }}</div>
        <div>{{ item.favourite }}</div>
        <div>{{ item.age }}</div>
        <img v-for="(i, index) in item.imgArr" :src="i" :key="index" alt="" />
         :name="item.title"
          :label="item.desc"
      </div> -->
    <div class="flex-center content-wrap">
      <el-carousel :interval="4000" type="card" style="width:96%" height="84vh">
        <el-carousel-item v-for="item in imgList" :key="item._id">
          <div class="img__wrap">
            <el-image :src="item.imgUrl" class="image-item" />
            <div class="img__footer">
              <div class="img__title">{{ item.title }}</div>
              <div class="img__desc">{{ item.desc }}</div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- <svg-icon name="qq" /> -->
    <!-- <img src="~/assets/sprite/svg/yun.svg" alt="" /> -->
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      // imgList: [
      //   // '//static.zhansha.love/upload/566994249F9041AB71F31AFA8211D196.jpg',
      //   '//v1.alapi.cn/api/bing',
      //   // '//v1.alapi.cn/api/acg',
      //   '//static.zhansha.love/upload/transition.png',
      //   '//static.zhansha.love/images/test1.jpg',
      //   '//static.zhansha.love/upload/test.jpg'
      // ]
    }
  },
  async asyncData({ $axios }) {
    const res = await $axios.$get('/api/banner/list')
    return {
      imgList: res.data
    }
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
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: url('~assets/images/bubble.svg') no-repeat center;
  background-size: cover;
}

.image-item {
  width: 100%;
  height: 100%;
}
.home {
  // height: calc(100vh - 61px);
}
.img {
  &__wrap {
    width: 100%;
    height: 100%;
    position: relative;
  }
  &__footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    color: #ffffff;
    text-align: center;
    padding: 10px;
    line-height: $line-height2;
  }
  &__title {
    font-size: $size2;
  }
  &__desc {
    font-size: $size3;
  }
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
