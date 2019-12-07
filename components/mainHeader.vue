<template>
  <!-- <Sticky :z-index="2001" class="header" class-name="main-header"> -->
  <div class="header-content">
    <div :class="{ 'is-show': showNav }" class="nav-body">
      <div @click="showNav = false" class="nav-list clearfix">
        <nuxt-link class="nav-item" exact to="/">首页</nuxt-link>
        <nuxt-link class="nav-item" to="/about">关于</nuxt-link>
      </div>
    </div>

    <div :class="{ 'is-active': showNav }" class="nav-btn flex-center">
      <i @click="toggleNav" class="el-icon-plus" size="small" type="primary">
        <!-- {{
        showNav ? '收起' : '展开'
      }} -->
      </i>
    </div>

    <div class="avatar flex-center">
      <template v-if="$auth.$state.loggedIn">
        <el-dropdown trigger="click">
          <span class="flex-center">
            <!-- 下拉菜单<i class="el-icon-arrow-down el-icon--right"></i> -->
            <el-avatar :src="$auth.user.avatar">
              {{ $auth.user.username.slice(0, 1) }}
            </el-avatar>
            <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item divided>
              <span @click="$router.push('/user/info')">我的信息</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <span @click="$auth.logout()">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
      <!-- <el-avatar v-else @click.native="$router.push('/user/login')"> -->
      <el-avatar v-else @click.native="$auth.checkLogin(true)">
        <i class="el-icon-user"></i
      ></el-avatar>
    </div>
  </div>
  <!-- </Sticky> -->
</template>

<script>
// import Sticky from '@/components/Sticky'
export default {
  components: {
    // Sticky
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
.el-icon-user {
  font-size: 16px;
}
.header-content {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: rgba(255, 255, 255, 0.8);
  z-index: 2000;
  // box-shadow: 0px 2px 10px 0px #dadada;
  @extend %shadow1;
}

.nav-item {
  transition: all 0.5s;
  &.nuxt-link-active {
    color: #ffffff;
    background-color: $font1;
  }
  &:hover {
    opacity: 0.5;
    color: #ffffff;
    background-color: $font1;
  }
}

.nav-btn {
  transition: all 0.5s;
  visibility: visible;
  opacity: 1;
  font-size: 34px;
  color: #666666;
  position: absolute;
  left: 20px;
  top: 0;
  cursor: pointer;
  &.is-active {
    transform: rotate(45deg);
    &:hover {
      transform: rotate(-135deg);
    }
  }
  &:hover {
    transform: rotate(180deg);
  }
}

@media only screen and (min-width: 768px) {
  .nav-body {
    padding-left: 20px;
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
  }
  .nav-btn {
    visibility: hidden;
    opacity: 0;
    transform: scale(0);
  }
}
@media only screen and (max-width: 767px) {
  .nav-list {
    // position: absolute;
    // margin-top: 60px;
    // left: 0;
    width: 100%;
    border-bottom: 1px solid $border2;
    border-top: 1px solid $border2;
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
    background: #ffffff;
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
  }
  // .nav-btn {
  //   display: block;
  //   visibility: visible;
  //   opacity: 1;
  //   font-size: 40px;
  //   color: #666666;
  //   position: absolute;
  //   left: 20px;
  //   top: 0;
  //   // display: block;
  //   // float: right;
  //   // margin-top: 15px;
  //   // margin-right: 20px;
  // }
}

.avatar {
  position: absolute;
  cursor: pointer;
  right: 20px;
  top: 0;
}
</style>
