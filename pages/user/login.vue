<template>
  <div class="page-container">
    <div class="bg-main" alt="" />
    <div class="home">
      <el-row class="form-wrap" type="flex" justify="center">
        <el-col :xs="22" :sm="12" :md="10" :lg="8" :xl="6">
          <el-card>
            <h2 align="center">登录</h2>
            <el-form
              ref="form"
              :model="form"
              :rules="rules"
              status-icon
              label-width="80px"
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
                  type="password"
                  autocomplete="off"
                ></el-input>
              </el-form-item>

              <div align="center">
                <el-button @click.prevent="submitForm('form')" type="primary"
                  >提交</el-button
                >
                <el-button @click.prevent="resetForm('form')">重置</el-button>
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
            .then((res) => {
              this.$message.success('登录成功')
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
