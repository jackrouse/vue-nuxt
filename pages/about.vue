<template>
  <div>
    <div class="page-container w1200">
      <img class="bg-main" src="~assets/images/ye1.svg" alt="" />
      <div class="ml-20 mr-20 mb-20">
        <el-row :gutter="20">
          <el-col
            :xs="24"
            :sm="16"
            :md="16"
            :lg="16"
            :xl="16"
            class="page-left mt-20"
          >
            <el-row :gutter="20">
              <el-col v-for="item in data" :key="item._id" class="card-item">
                <!-- <el-card :body-style="{ padding: '0px' }"> -->
                <el-card>
                  <div slot="header" class="header">
                    <span class="title">{{ item.title }}</span>

                    <nuxt-link
                      :to="'/article/' + item._id"
                      class="el-link el-link--primary is-underline"
                      >查看详情</nuxt-link
                    >
                  </div>
                  <div class="image-wrap">
                    <el-image
                      v-if="item.imgUrl"
                      :src="item.imgUrl"
                      :preview-src-list="[item.imgUrl]"
                      class="image"
                      fit="contain"
                      lazy
                    />
                  </div>
                  <div>
                    <div v-if="item.summary" class="summary">
                      {{ item.summary }}
                    </div>
                    <!-- <div v-html="item.content" class="content"></div> -->
                    <div class="bottom">
                      <time class="time">{{
                        item.publishTime | parseTime('{y}-{m}-{d}')
                      }}</time>
                      <!-- <el-button type="text" class="button" style="float:right"
                      >操作按钮</el-buttonspan
                    > -->
                      <span class="author">{{ item.author }}</span>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
            <el-pagination
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
              :current-page.sync="listQuery.page"
              :page-sizes="[10, 20, 30]"
              :page-size="listQuery.limit"
              :total="total"
              class="mt-20 mb-20"
              background
              layout="total, prev, pager, next"
            >
            </el-pagination>
          </el-col>
          <el-col
            :xs="24"
            :sm="8"
            :md="8"
            :lg="8"
            :xl="8"
            class="page-right mt-20"
          >
            <main-aside />
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import mainAside from '~/components/mainAside.vue'

export default {
  name: 'About',
  watchQuery: ['page', 'limit'],
  components: {
    mainAside
  },
  data() {
    return {
      // listQuery: {
      //   page: 0,
      //   limit: 10
      // }
    }
  },
  async asyncData({ query, $axios }) {
    const res = await $axios.get('/api/article/list', {
      params: {
        limit: query.limit,
        page: query.page
      }
    })
    return {
      ...res.data,
      listQuery: {
        limit: query.limit ? query.limit * 1 : 10,
        page: query.page ? query.page * 1 : 1
      }
    }
  },
  created() {
    // console.log(this)
  },
  methods: {
    handleCurrentChange(e) {
      this.listQuery.page = e
      this.$router.replace({ name: 'about', query: this.listQuery })
    },
    handleSizeChange(e) {
      this.listQuery.limit = e
      this.$router.replace({ name: 'about', query: this.listQuery })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-pagination {
  text-align: center;
}
.bg-main {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
.image {
  height: 100px;
  width: 100px;
  &-wrap {
    // padding: 0 20px;
  }
}
.page-left {
  // margin-left: 20px;
}

.page-right {
  // margin-right: 20px;
}

.header {
  display: flex;
  align-items: center;
}
.title {
  flex: 1;
  @include ellipsis();
  font-size: $size2;
  font-weight: bold;
}

.abouts {
  display: flex;
}
.card-item {
  color: $font2;
  margin-top: 20px;
  &:first-child {
    margin-top: 0;
  }
}
.content {
  overflow-x: auto;
  line-height: $line-height2;
}
.summary {
  // padding: 10px 0;
  padding-bottom: 10px;
  font-size: $size3;
  line-height: $line-height2;
}

.bottom {
  display: flex;
  font-size: $size4;
  color: $font4;
}
.time {
}
.author {
  margin-left: auto;
}
</style>
