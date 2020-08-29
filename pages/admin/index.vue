<template>
  <div>
    <h1>Аналитика по постам</h1>
    <v-analytics-chart title="Количество просмотров" :labels="views.labels" :data="views.data"/>
    <v-analytics-chart title="Количество комментариев" :labels="comments.labels" :data="comments.data"/>
  </div>
</template>

<script>
import vAnalyticsChart from '@/components/admin/v-analytics-chart'
export default {
  name: 'index',
  head: {
    title: `Аналитика | ${process.env.appName}`
  },
  layout: 'admin',
  middleware: ['admin-auth'],
  components: {
    vAnalyticsChart
  },
  async asyncData ({ store }) {
    const { views, comments } = await store.dispatch('post/getAnalytics')
    return { views, comments }
  }
}
</script>

<style scoped>

</style>
