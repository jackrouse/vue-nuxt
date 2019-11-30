<template>
  <div class="page-container">
    <img class="bg-main" src="~assets/images/ye1.svg" alt="" />
    <div class="ml-20 mr-20">
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
              <el-card :body-style="{ padding: '0px' }">
                <div slot="header" class="clearfix">
                  <span>{{ item.title }}</span>

                  <nuxt-link
                    :to="'/article/' + item._id"
                    style="float: right; padding: 3px 0"
                    class="el-link el-link--primary is-underline"
                    >查看详情</nuxt-link
                  >
                </div>
                <div class="image-wrap">
                  <img v-if="item.imgUrl" :src="item.imgUrl" class="image" />
                </div>
                <div style="padding: 14px;">
                  <div v-if="item.summary" class="summary">
                    {{ item.summary }}
                  </div>
                  <!-- <div v-html="item.content" class="content"></div> -->
                  <div class="bottom clearfix">
                    <time class="time">{{ item.publishTime }}</time>
                    <!-- <el-button type="text" class="button" style="float:right"
                      >操作按钮</el-buttonspan
                    > -->
                    <span style="float: right; padding: 3px 0">{{
                      item.author
                    }}</span>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
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

    <el-pagination
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      :current-page.sync="listQuery.page"
      :page-sizes="[10, 20, 30]"
      :page-size="listQuery.limit"
      :total="total"
      class="mt-20 mb-20"
      background
      layout="total, sizes, prev, pager, next, jumper"
    >
    </el-pagination>
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
  max-height: 100px;
  width: auto;
  &-wrap {
    padding: 0 20px;
  }
}
.page-left {
  // margin-left: 20px;
}

.page-right {
  // margin-right: 20px;
}
.abouts {
  display: flex;
}
.card-item {
  margin-top: 20px;
  &:first-child {
    margin-top: 0;
  }
}
.content {
  overflow-x: auto;
}
.summary {
  padding: 10px 0;
  font-size: 20px;
  font-weight: bold;
}
</style>
