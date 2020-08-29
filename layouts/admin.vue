<template>
  <div class="admin-layout-wrap">
    <el-container :style="{height: '100%'}">
      <el-aside width="250px">
        <v-app-aside/>
      </el-aside>
      <el-main><nuxt/></el-main>
    </el-container>
  </div>

</template>

<script>
import vAppAside from '@/components/admin/v-app-aside'
export default {
  name: 'admin',
  components: {
    vAppAside
  },
  computed: {
    error () {
      return this.$store.getters.error
    }
  },
  watch: {
    error (value) {
      this.$message.error(value.response.data.message)
    }
  }
}
</script>

<style scoped lang="scss">
  .admin-layout-wrap {
    width: 100%;
    height: 100vh;
  }
</style>
