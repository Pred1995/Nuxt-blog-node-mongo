import cookie from 'cookie'
import cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

export const state = () => ({
  token: null
})

export const mutations = {
  setToken (state, token) {
    state.token = token
  },
  clearToken (state) {
    state.token = null
  }
}

export const actions = {
  async login ({ commit, dispatch }, formData) {
    try {
      console.log(formData)
      const { token } = await this.$axios.$post('/api/auth/admin/login', formData)
      console.log('token', token)
      dispatch('setToken', token)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  autoLogin ({ commit, dispatch }) {
    const cookieStr = process.browser
      ? document.cookie : this.app.context.req.headers.cookie
    const cookies = cookie.parse(cookieStr || '') || {}
    const token = cookies['jwt-token']
    if (isJwtValid(token)) {
      dispatch('setToken', token)
    } else {
      dispatch('logout')
    }
  },
  async createUser ({ commit }, formData) {
    try {
      await this.$axios.$post('/api/auth/admin/create', formData)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  setToken ({ commit }, token) {
    this.$axios.setToken(token, 'Bearer')
    commit('setToken', token)
    cookies.set('jwt-token', token)
  },
  logout ({ commit }) {
    this.$axios.setToken(false)
    commit('clearToken')
    cookies.remove('jwt-token')
  }
}

export const getters = {
  isAuth: state => Boolean(state.token),
  token: state => state.token
}

function isJwtValid (token) {
  if (!token) {
    return false
  }
  const jwtData = jwtDecode(token) || {}
  const expires = jwtData.exp || 0
  return (new Date().getTime() / 1000 < expires)
}
