<template>
  <el-card shadow="hover" :body-style="{padding: 0}" class="post">
    <header slot="header" class="post-header">
      <h3>{{ post.title }}</h3>
      <small> <i class="el-icon-time"></i>{{ post.date | date('time') }}</small>
    </header>
    <div class="post-body">
      <img :src="post.imageUrl" alt="post-img" class="post-img">
    </div>
    <footer class="post-footer">
      <el-button round @click="openPost">Открыть пост</el-button>
      <span>
        <i class="el-icon-s-comment"></i>
        {{ post.comments.length }}
      </span>
    </footer>
  </el-card>
</template>

<script>
export default {
  name: 'v-post',
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  methods: {
    openPost () {
      const id = this.post._id
      this.$router.push(`/post/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
  .post {
    margin-bottom: 1.5rem;
  }
  .post-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .post-img {
    width: 100%;
    height: auto;
  }
  .post_body {
    margin-bottom: 1rem;
  }
  .post-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
  }
</style>
