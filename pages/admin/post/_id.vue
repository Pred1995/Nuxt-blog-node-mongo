<template>
  <div class="page-wrapper">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/admin/list">Посты</el-breadcrumb-item>
      <el-breadcrumb-item>{{post.title}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form :model="controls" :rules="rules" ref="form" @submit.native.prevent="onSubmit">
<!--      <h2>Войти в панель администратора</h2>-->
      <el-form-item label="Текст в формате .md или .html" prop="text">
        <el-input v-model="controls.text" type="textarea" resize="none" :rows="10"/>
      </el-form-item>
      <div class="mb">
        <small class="mr">
          <i class="el-icon-time"></i>
          <span>{{ new Date(post.date).toLocaleDateString() }}</span>
        </small>
        <small>
          <i class="el-icon-view"></i>
          <span>{{ post.views }}</span>
        </small>
      </div>
      <el-form-item>
        <el-button type="primary" round native-type="submit" :loading="loading">Обновить</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  middleware: ['admin-auth'],
  head () {
    return {
      title: `${this.post.title} | ${process.env.appName}`
    }
  },
  validate ({ params }) {
    return Boolean(params.id)
  },
  async asyncData ({ store, params }) {
    const post = await store.dispatch('post/fetchAdminById', params.id)
    return { post }
  },
  data: () => ({
    loading: false,
    controls: {
      text: ''
    },
    rules: {
      text: [
        { required: true, message: 'Текст не должен быть пустым !!!!', trigger: 'blur' }
      ]
    }
  }),
  mounted () {
    this.controls.text = this.post.text
  },
  methods: {
    onSubmit () {
      this.$refs.form.validate(async (val) => {
        if (val) {
          this.loading = true
          const formData = {
            text: this.controls.text,
            id: this.post._id
          }
          try {
            await this.$store.dispatch('post/update', formData)
            this.$message.success('Пост обновлен')
            this.loading = false
          } catch (e) {
            this.loading = false
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .page-wrapper {
    width: 600px;
  }
  .mb {
    margin-bottom: 1.5rem;
  }
  .mr {
    margin-right: 2rem;
  }
</style>
