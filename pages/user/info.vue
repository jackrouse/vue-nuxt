<template>
  <div class="page-container">
    <div class="bg-main" alt="" />
    <div class="home">
      <el-row class="form-wrap" type="flex" justify="center">
        <el-col :xs="22" :sm="12" :md="10" :lg="8" :xl="6">
          <el-card>
            <h2 class="title">个人信息</h2>
            <el-form
              ref="form"
              :model="form"
              :rules="rules"
              status-icon
              label-width="80px"
            >
              <el-form-item label="用户名" prop="username">
                <el-input v-model.trim="form.username"></el-input>
              </el-form-item>

              <el-form-item label="上传头像">
                <el-upload
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                  name="avatar"
                  class="avatar-uploader"
                  action="/api/upload"
                >
                  <img v-if="form.avatar" :src="form.avatar" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>

              <div align="center">
                <el-button
                  @click.prevent="submitForm('form')"
                  plain
                  round
                  type="primary"
                  >提交</el-button
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
  name: 'Userinfo',
  layout: 'login',
  middleware: 'auth',
  components: {},
  data() {
    return {
      form: {
        username: this.$auth.user.username,
        avatar: this.$auth.user.avatar,
        id: this.$auth.user._id
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .$put(`/api/user/modify/${this.form.id}`, {
              username: this.form.username,
              avatar: this.form.avatar
            })
            .then((res) => {
              if (res.status === 'success') {
                // this.$router.replace('/user/login')
                this.$auth.fetchUser().then((res) => {
                  this.$message.success('修改成功')
                  this.$router.replace('/')
                })
              }
              console.log(res)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw)
      console.log(res)

      if (res.data && res.data.url) {
        this.form.avatar = res.data.url
      } else {
        this.$message.error('上传失败')
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
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

.title {
  font-size: $size1;
  text-align: center;
}

.home {
  // height: calc(100vh - 61px);
  /deep/ {
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
}
.form-wrap {
  width: 100%;
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translate(-50%);
}
</style>
