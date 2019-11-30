<template>
  <div class="page-container">
    <div class="bg-main" alt="" />
    <el-card class="mrg20">
      <div slot="header" class="clearfix">
        <span>{{ detail.title }}</span>
        <span
          style="float: right; padding: 3px 0"
          class="el-button--text"
          type="text"
          >{{ detail.author }}</span
        >
      </div>
      <img v-if="detail.imgUrl" :src="detail.imgUrl" class="image" />
      <div style="padding: 14px;">
        <div v-if="detail.summary" class="summary">
          {{ detail.summary }}
        </div>
        <div v-html="detail.content" class="content"></div>
        <div class="bottom clearfix">
          <time class="time">{{ detail.publishTime }}</time>
        </div>
      </div>
    </el-card>

    <el-card v-loading="isLoading" class="mrg20">
      <div slot="header" class="clearfix">
        <span>评论列表</span>
      </div>
      <template v-if="comments.data && comments.data.length">
        <div v-for="item in comments.data" :key="item._id">
          <el-avatar :src="item.from.avatar"> </el-avatar>
          <div>{{ item.from.username }}</div>
          <div>{{ item.content }}</div>
          <div>{{ item.addTime }}</div>
          <el-divider></el-divider>
        </div>
        <div class="more-btn">
          <template v-if="!noMore">
            <el-button @click="loadMore" :loading="isLoading" type="primary">{{
              isLoading ? '加载中' : '查看更多'
            }}</el-button>
          </template>
          <div v-else>到底了</div>
        </div>
      </template>
      <div v-else>暂无评论</div>
    </el-card>

    <el-card class="mrg20">
      <div slot="header" class="clearfix">
        <span>发表评论</span>
        <el-button @click="submitComment" size="mini" class="fr" type="primary"
          >发布</el-button
        >
      </div>
      <el-input
        @focus="checkLogin"
        v-model.trim="commentsValue"
        :autosize="{ minRows: 3, maxRows: 8 }"
        type="textarea"
        placeholder="请输入评论"
      ></el-input>
    </el-card>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      commentsValue: '',
      isLoading: false,
      noMore: false,
      page: 2,
      limit: 10
    }
  },
  async asyncData({ params, $axios }) {
    const res = await $axios.$get(`/api/article/getDetail/${params.id}`)
    const comments = await $axios.$get(`/api/article/comment/list/${params.id}`)
    return {
      detail: res.data,
      comments
    }
  },
  mounted() {
    console.log(this)
  },
  methods: {
    checkLogin() {
      if (!this.$auth.loggedIn) {
        this.$message({
          message: '请先登录',
          type: 'info',
          offset: 200,
          duration: 1000,
          onClose: () => {
            this.$router.push('/user/login')
          }
        })
      }
      return this.$auth.loggedIn
    },
    getCommentList() {
      this.noMore = false
      this.page = 1
      this.comments.data = []
      this.loadMore()
    },
    loadMore() {
      if (this.noMore) return
      this.isLoading = true
      this.$axios
        .$get(`/api/article/comment/list/${this.detail._id}`, {
          params: {
            page: this.page,
            limit: this.limit
          }
        })
        .then((res) => {
          this.isLoading = false

          if (!res.data.length) {
            this.noMore = true
            return
          }

          this.comments.data = this.comments.data.concat(res.data)
          this.page++
        })
    },
    submitComment() {
      if (!this.checkLogin()) {
        return
      }
      if (!this.commentsValue) {
        this.$message.warning('请输入评论')
        return
      }
      this.$axios
        .$post(`/api/article/comment/${this.detail._id}`, {
          content: this.commentsValue,
          from: this.$auth.user._id
        })
        .then((res) => {
          if (res.status === 'success') {
            this.commentsValue = ''
            this.$message.success('评论成功')
            this.getCommentList()
            // this.$router.go(0)
            // this.comments.data.push(res.data)
          }
        })
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
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: url('~assets/images/trianglify.svg') no-repeat center;
  background-size: cover;
}
.home {
  height: calc(100vh - 61px);
}
.more-btn {
  text-align: center;
}
</style>
