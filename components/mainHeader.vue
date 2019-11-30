<template>
  <Sticky :z-index="2001" class="header" class-name="main-header">
    <!-- <el-header>
      <el-menu
        :default-active="activeIndex"
        @select="handleSelect"
        class="el-menu-demo"
        mode="horizontal"
      >
        <el-menu-item index="1">
          <nuxt-link to="/">首页</nuxt-link>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="2-1">
            <nuxt-link to="/about">about</nuxt-link>
          </el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3" disabled>消息中心</el-menu-item>
        <el-menu-item index="4"
          ><a href="https://www.ele.me" target="_blank">订单管理</a>
        </el-menu-item>
      </el-menu>
    </el-header> -->

    <div class="header-content">
      <div :class="{ 'is-show': showNav }" class="nav-body">
        <div @click="showNav = false" class="nav-list clearfix">
          <nuxt-link class="nav-item" exact to="/">首页</nuxt-link>
          <nuxt-link class="nav-item" to="/about">关于</nuxt-link>
        </div>
      </div>

      <div class="nav-btn flex-center">
        <el-button @click="toggleNav" size="small" type="primary">{{
          showNav ? '收起' : '展开'
        }}</el-button>
      </div>

      <div class="avatar flex-center">
        <template v-if="$auth.$state.loggedIn">
          <el-dropdown trigger="click">
            <span class="flex-center">
              <!-- 下拉菜单<i class="el-icon-arrow-down el-icon--right"></i> -->
              <el-avatar> {{ $auth.user.username }} </el-avatar>
              <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item divided>
                <span @click="$auth.logout()">退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <!-- <el-avatar v-else @click.native="$router.push('/user/login')"> -->
        <el-avatar v-else @click.native="$router.push('/user/login')">
          登录</el-avatar
        >
      </div>
    </div>
  </Sticky>
</template>

<script>
import Sticky from '@/components/Sticky'
export default {
  components: {
    Sticky
  },
  data() {
    return {
      activeIndex: '1',
      showNav: false
    }
  },
  methods: {
    toggleNav() {
      this.showNav = !this.showNav
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  color: #ffffff;
  position: relative;
  // /deep/.main-header {
  //   background-color: rgba(255, 255, 255, 0.8);
  //   border-bottom: solid 1px #e6e6e6;
  // }
  // /deep/ .el-menu {
  //   background-color: transparent;
  //   border-bottom: 0;
  // }
  @media only screen and (min-width: 768px) {
    .header-content {
      height: 60px;
      background: #545c64;
      // display: flex;
    }
    .nav-body {
      height: 60px;
    }
    .nav-list {
      // display: flex;
      line-height: 60px;
    }
    .nav-item {
      float: left;
      height: 100%;
      padding: 0 20px;
      &.nuxt-link-active {
        color: #333333;
        background-color: #ffffff;
      }
      &:hover {
        color: #333333;
        background-color: #ffffff;
      }
    }
    .nav-btn {
      display: none;
    }
  }
  @media only screen and (max-width: 767px) {
    .header-content {
      height: 60px;
      background: #545c64;
    }
    .nav-list {
      // position: absolute;
      // margin-top: 60px;
      // left: 0;
      width: 100%;
      border-bottom: 1px solid #cccccc;
      // background: blue;
      // display: none;
      // visibility: hidden;
      // opacity: 0;
      // max-height: 0;
      // transform: translateY(-100%);
    }
    .nav-body {
      position: absolute;
      margin-top: 60px;
      transition: all 0.5s;
      width: 100%;
      max-height: 0;
      overflow: hidden;
      visibility: hidden;
      &.is-show {
        // display: block;
        // visibility: visible;
        // transform: translateY(0);
        // opacity: 1;
        visibility: visible;
        max-height: 200px;
      }
    }
    .nav-item {
      display: block;
      line-height: 60px;
      text-align: center;
      background: #545c64;
      &.nuxt-link-active {
        color: #333333;
        background-color: #ffffff;
      }
      &:hover {
        color: #333333;
        background-color: #ffffff;
      }
    }
    .nav-btn {
      position: absolute;
      left: 20px;
      top: 0;
      // display: block;
      // float: right;
      // margin-top: 15px;
      // margin-right: 20px;
    }
  }

  .avatar {
    position: absolute;
    cursor: pointer;
    right: 20px;
    top: 0;
  }
}
</style>
