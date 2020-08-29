<template>
  <article class="post">
    <header class="post-header">
      <div class="post-title">
        <h1>{{ post.title }}</h1>
        <nuxt-link to="/"><i class="el-icon-back"></i></nuxt-link>
      </div>
      <div class="post-info">
        <small> <i class="el-icon-time"></i>{{ post.date | date }}</small>
        <small> <i class="el-icon-view"></i> {{ post.views }} </small>
      </div>
      <div class="post-image">
        <img :src="post.imageUrl" alt="">
      </div>
    </header>
    <main class="post-content">
      <v-markdown>{{ post.text }}</v-markdown>
    </main>
    <footer>
      <v-comment-form v-if="canAddComment" @created="createCommentHandler" :postId="post._id"/>
      <div class="comments" v-if="post.comments.length">
        <v-comment v-for="comment in post.comments" :key="comment._id" :comment="comment"/>
      </div>
      <div class="text-center" v-else>Комментариев нет!</div>
    </footer>
  </article>
</template>

<script>
import vComment from '@/components/main/v-comment'
import vCommentForm from '@/components/main/v-comment-form'
export default {
  head () {
    return {
      title: `${this.post.title} | ${process.env.appName}`
    }
  },
  validate ({ params }) {
    return Boolean(params.id)
  },
  components: {
    vComment, vCommentForm
  },
  async asyncData ({ store, params }) {
    const post = await store.dispatch('post/fetchById', params.id)
    await store.dispatch('post/addView', post)
    return {
      post: { ...post, views: ++post.views }
    }
  },
  data () {
    return {
      canAddComment: true
    }
  },
  methods: {
    createCommentHandler (comment) {
      this.post.comments.unshift(comment)
      this.canAddComment = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .post {
    max-width: 600px;
    margin: 0 auto;
  }

  .post-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .post-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: .5rem;
  }
  .post-image img {
    width: 100%;
    height: auto;
  }
  .post-header {
    margin-bottom: 1.5rem;
  }

  .post-content {
    margin-bottom: 2rem;
  }
</style>
