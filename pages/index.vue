<template>
  <el-row type="flex" justify="center">
    <el-col :xs="24" :sm="18" :md="12" :lg="10">
      <v-app-post v-for="post in posts" :key="post._id" :post="post"/>
    </el-col>
  </el-row>
</template>
<script>
import vAppPost from '@/components/main/v-post'
export default {
  head: {
    title: `Главная | ${process.env.appName}`
  },
  async asyncData ({ store }) {
    const posts = await store.dispatch('post/fetch')
    return { posts }
  },
  components: {
    vAppPost
  }
  // async asyncData ({ $http }) {
  //   const test = await $http.$get('/api/test')
  //   return {
  //     test
  //   }
  // }
}
</script>

<style scoped>

</style>
