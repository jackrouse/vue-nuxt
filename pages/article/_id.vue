<template>
  <div class="page-container w1200">
    <div class="bg-main" alt="" />
    <el-card class="article mrg20">
      <div slot="header" class="header">
        <span class="title">{{ detail.title }}</span>
        <span class="author">{{ detail.author }}</span>
      </div>

      <template v-if="detail.imgUrl">
        <!-- <img :src="detail.imgUrl" class="image" /> -->
        <div class="image-wrap">
          <el-image
            v-if="detail.imgUrl"
            :src="detail.imgUrl"
            :preview-src-list="[detail.imgUrl]"
            class="image"
            fit="contain"
            lazy
          />
        </div>
        <el-divider></el-divider>
      </template>

      <div class="info">
        <div v-if="detail.summary" class="summary">
          {{ detail.summary }}
        </div>
        <div v-html="detail.content" class="content"></div>
        <div class="bottom">
          <span class="time">{{
            detail.publishTime | parseTime('{y}-{m}-{d}')
          }}</span>
        </div>
      </div>
    </el-card>

    <!-- <el-card v-loading="isLoading" class="mrg20"> -->
    <el-card v-loading="isLoading" class="mrg20">
      <div slot="header" class="clearfix">
        <span class="title">评论列表</span>
      </div>

      <template v-if="comments.data && comments.data.length">
        <div class="comment__list">
          <div
            v-for="item in comments.data"
            :key="item._id"
            class="comment__item"
          >
            <div class="comment__left">
              <el-avatar :size="40" :src="item.from.avatar">
                {{ item.from.username.slice(0, 1) }}
              </el-avatar>
              <div class="name">{{ item.from.username }}</div>
            </div>
            <div class="comment__right">
              <div class="content">{{ item.content }}</div>
              <div class="footer">
                <span class="time">{{
                  item.addTime | parseTime('{y}-{m}-{d} {h}:{i}')
                }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="more-btn">
          <template v-if="!noMore">
            <el-button @click="loadMore" :loading="isLoading" type="text">{{
              isLoading ? '加载中' : '查看更多'
            }}</el-button>
          </template>
          <el-divider v-else>到底了</el-divider>
        </div>
      </template>
      <div v-else class="flex-center">
        <svg-icon class="empty-icon" name="empty" />
      </div>
    </el-card>

    <el-card class="mrg20">
      <div slot="header" class="clearfix">
        <span class="title">发表评论</span>
        <el-button
          @click="submitComment"
          plain
          round
          size="mini"
          class="fr"
          type="primary"
          >发布</el-button
        >
      </div>
      <el-input
        @focus="$auth.checkLogin(true)"
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
    try {
      const res = await $axios.$get(`/api/article/getDetail/${params.id}`)
      const comments = await $axios.$get(
        `/api/article/comment/list/${params.id}`
      )
      return {
        detail: res.data,
        comments
      }
    } catch (error) {}
  },
  mounted() {
    console.log(this)
  },
  methods: {
    // checkLogin() {
    //   // if (!this.$auth.loggedIn) {
    //   //   this.$message({
    //   //     message: '请先登录',
    //   //     type: 'info',
    //   //     offset: 200,
    //   //     duration: 1000,
    //   //     onClose: () => {
    //   //       this.$router.push('/user/login')
    //   //     }
    //   //   })
    //   // }
    //   // return this.$auth.loggedIn

    // },
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
      // if (!this.checkLogin()) {
      //   return
      // }
      this.$auth.checkLogin(true).then(() => {
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
  background: url('~assets/images/wave.svg') no-repeat center;
  background-size: cover;
}

.title {
  flex: 1;
  @include ellipsis();
  font-size: $size1;
  font-weight: bold;
}
.empty-icon {
  width: 100px;
}

.image-wrap {
  text-align: center;
}
.more-btn {
  text-align: center;
}

.article {
  line-height: $line-height3;
  .header {
    display: flex;
    align-items: center;
  }

  .author {
    flex: none;
    color: $font4;
    font-size: $size4;
  }
  .info {
    // border-top: 1px solid $border1;
  }
  .summary {
    font-size: $size2;
  }
  .content {
    color: $font2;
    font-size: $size4;
    line-height: $line-height2;
  }
  .bottom {
    color: $font4;
    font-size: $size4;
    display: flex;
  }
  .time {
    margin-left: auto;
  }
}

.comment {
  &__item {
    display: flex;
    padding: 20px 0;
    border-bottom: 1px solid $border2;
    &:last-child {
      border: none;
    }
  }
  &__left {
    text-align: center;
    flex: none;
    margin-right: 20px;
    .name {
      color: $font2;
      font-size: $size4;
    }
  }
  &__right {
    flex: 1;
    display: flex;
    flex-direction: column;
    font-size: $size4;
    .content {
      flex: 1;
      line-height: $line-height2;
    }
    .footer {
      display: flex;
      color: $font4;
    }
    .time {
      margin-left: auto;
    }
  }
}
</style>
