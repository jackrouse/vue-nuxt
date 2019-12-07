<template>
  <div class="page-container">
    <div class="bg-main" alt="" />
    <div class="home">
      <el-row class="form-wrap" type="flex" justify="center">
        <el-col :xs="22" :sm="12" :md="10" :lg="8" :xl="6">
          <el-card>
            <h2 class="title">注册</h2>
            <el-form
              ref="form"
              :model="form"
              :rules="rules"
              label-position="left"
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
              <el-form-item label="确认密码" prop="checkPass">
                <el-input
                  @keyup.enter.native="submitForm('form')"
                  v-model.trim="form.checkPass"
                  type="password"
                  autocomplete="off"
                ></el-input>
              </el-form-item>

              <div class="flex-center">
                <el-button
                  @click.prevent="submitForm('form')"
                  round
                  plain
                  type="primary"
                  >注册</el-button
                >
                <el-button @click.prevent="resetForm('form')" round plain
                  >重置</el-button
                >

                <el-button
                  @click.prevent="$router.push('/user/login')"
                  class="align-right"
                  type="text"
                  >去登录</el-button
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
export default {
  layout: 'login',
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
        if (this.form.checkPass !== '') {
          this.$refs.form.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        username: '',
        password: '',
        checkPass: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .$post('/api/user/register', {
              username: this.form.username,
              password: this.form.password
            })
            .then((res) => {
              if (res.status === 'success') {
                this.$router.replace('/user/login')
              }
              console.log(res)
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
