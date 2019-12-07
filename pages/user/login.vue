<template>
  <div class="page-container">
    <div class="bg-main" alt="" />
    <div class="home">
      <el-row class="form-wrap" type="flex" justify="center">
        <el-col :xs="22" :sm="12" :md="10" :lg="8" :xl="6">
          <el-card>
            <h2 class="title">登录</h2>
            <el-form
              ref="form"
              :model="form"
              :rules="rules"
              status-icon
              label-position="left"
              label-width="66px"
            >
              <el-form-item label="用户名" prop="username">
                <el-input
                  v-model.trim="form.username"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input
                  v-model.trim="form.password"
                  @keyup.enter.native="submitForm('form')"
                  type="password"
                  autocomplete="off"
                ></el-input>
              </el-form-item>

              <div class="flex-center">
                <el-button
                  @click.prevent="submitForm('form')"
                  type="primary"
                  round
                  plain
                  >登录</el-button
                >

                <el-button @click.prevent="resetForm('form')" round plain
                  >重置</el-button
                >
                <el-button
                  @click.prevent="$router.push('/user/register')"
                  class="align-right"
                  type="text"
                  >去注册</el-button
                >
              </div>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
// import Cookies from 'js-cookie'
const getOtherQuery = (query) => {
  return Object.keys(query).reduce((acc, cur) => {
    if (cur !== 'redirect') {
      acc[cur] = query[cur]
    }
    return acc
  }, {})
}

export default {
  layout: 'login',
  // middleware: ['auth'],
  components: {},
  data() {
    // const checkAge = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error('年龄不能为空'))
    //   }
    //   setTimeout(() => {
    //     if (!Number.isInteger(value)) {
    //       callback(new Error('请输入数字值'))
    //     } else if (value < 18) {
    //       callback(new Error('必须年满18岁'))
    //     } else {
    //       callback()
    //     }
    //   }, 1000)
    // }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }

    return {
      redirect: '',
      otherQuery: '',
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, validator: validatePass, trigger: 'blur' }]
      }
    }
  },
  watch: {
    $route: {
      handler(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.$axios
          //   .$post('/api/user/login', {
          //     username: this.form.username,
          //     password: this.form.password
          //   })
          this.$auth
            .loginWith('local', {
              data: {
                username: this.form.username,
                password: this.form.password
              }
            })
            .then(() => {
              console.log(this.$auth)
              if (this.$auth.loggedIn) {
                this.$message.success('登录成功')
                this.$router.replace({
                  path: this.redirect || '/',
                  query: this.otherQuery
                })
              } else {
                this.$message.error('账号或密码错误')
              }

              // this.$router.push('/user/login')
              // if (res.status === 'success') {
              //   Cookies.set('token', res.data.token)
              //   this.$router.push('/')
              // }
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
  // async asyncData({ $axios }) {
  //   const res = await $axios.$post('/api/hero/getHeroList')
  //   return { res }
  // }

  // asyncData(params) {
  //   return {
  //     name: 123
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: $size1;
  text-align: center;
}
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
  // height: calc(100vh - 61px);
}
.form-wrap {
  width: 100%;
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translate(-50%);
}
</style>
