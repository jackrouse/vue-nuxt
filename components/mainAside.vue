<template>
  <div class="aside">
    <Sticky :stickyTop="80" class-name="main-aside">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>卡片名称</span>
          <el-button style="float: right; padding: 3px 0" type="text"
            >操作按钮</el-button
          >
        </div>
        <div v-for="o in 4" :key="o" class="text item">
          {{ '列表内容 ' + o }}
        </div>
      </el-card>
    </Sticky>
  </div>
</template>
<script>
import Sticky from '@/components/Sticky'

export default {
  components: {
    Sticky
  }
}
</script>
<style scoped lang="scss">
.aside {
  // margin-right: 20px;
}
.box-card {
  // margin-top: 20px;
}
</style>
