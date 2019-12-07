<template>
  <transition name="el-fade-in-linear">
    <footer v-show="info.content" class="main-footer">
      <div class="main-footer__content">
        <span>{{ info.content }}</span>
        <span>——{{ info.author }}</span>
      </div>
    </footer>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      info: {}
    }
  },
  created() {
    this.$axios
      .get('//v1.alapi.cn/api/mingyan')
      .then((res) => {
        this.info = res.data.data
      })
      .catch((err) => {})
  }
}
</script>

<style lang="scss" scoped>
.main-footer {
  position: relative;
  background: linear-gradient(135deg, #012, #221 70%, #332 90%);
  background-size: contain;
  overflow: hidden;
  text-align: center;
  font-size: $size2;
  color: #ffffff;
  &__content {
    padding: 20px 60px;
    min-height: 60px;
    line-height: 30px;
  }
}

@media only screen and (max-width: 767px) {
  .main-footer {
    font-size: $size4;
    &__content {
      padding: 20px;
    }
  }
}
</style>
