<template>
  <el-container>
    <el-header>
      <v-navigation/>
    </el-header>
    <el-main>
      <nuxt />
    </el-main>
    <el-footer />
  </el-container>
</template>

<script>
import vNavigation from '@/components/main/v-navigation'
export default {
  components: {
    vNavigation
  }
}
</script>

<style>

</style>
