export default function ({ $axios, redirect, store }) {
  $axios.interceptors.request.use((request) => {
    // eslint-disable-next-line dot-notation
    if (store.getters['auth/isAuth'] && !request.headers.common['Authorization']) {
      const token = store.getters['auth/token']
      // eslint-disable-next-line dot-notation
      request.headers.common['Authorization'] = `Bearer ${token}`
    }
    return request
  })
  $axios.onError((error) => {
    if (error.response) {
      if (error.response.status === 401) {
        redirect('/admin/login?message=session')
        store.dispatch('auth/logout')
      }
      if (error.response.status === 500) {
        console.log('Server 500 error')
      }
    }
  })
}
