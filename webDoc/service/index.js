import axios from 'axios'
import jsCookie from 'js-cookie'

import home from './home.js'
import doc from './doc.js'
import user from './user.js'
	
axios.defaults.baseURL = 'http://192.168.1.102:7001/'

// 请求拦截
axios.interceptors.request.use(
  config => {
    let token = jsCookie.get("token")

    if (token) {
      config.headers.authorization = `token ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export default {
  'home': home,
  'doc': doc,
  'user': user
}