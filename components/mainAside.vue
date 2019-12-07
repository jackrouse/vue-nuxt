<template>
  <div class="aside">
    <!-- <transition name="el-zoom-in-top"> -->
    <transition name="el-fade-in-linear">
      <Sticky :stickyTop="80" v-if="newsList.length" class-name="main-aside">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>热搜</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text"
            >操作按钮</el-button
          > -->
          </div>
          <div
            v-for="(item, index) in newsList"
            :key="index"
            class="news__item"
          >
            <span class="news__title">{{ item.hostWord[0] }}</span>
            <span class="news__num">{{ item.hostWordNum[0] }}</span>
          </div>
        </el-card>
      </Sticky>
    </transition>
  </div>
</template>
<script>
import Sticky from '@/components/Sticky'

export default {
  components: {
    Sticky
  },
  data() {
    return {
      newsList: []
    }
  },
  created() {
    this.$axios
      .get('//v1.alapi.cn/api/new/wbtop?num=10')
      .then((res) => {
        console.log(res.data.data)
        this.newsList = res.data.data
      })
      .catch((err) => {})
  }
}
</script>
<style scoped lang="scss">
.news {
  &__item {
    line-height: $line-height4;
    font-size: $font3;
    display: flex;
  }
  &__title {
    flex: 1;
    @include ellipsis();
  }
  &__num {
    flex: none;
    margin-left: 10px;
  }
}
</style>
