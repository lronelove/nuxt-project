/*
  和文章相关的接口
*/
import axios from 'axios'
import api from './api'

const userApi = api.user

export default {
  // 登录
  login (params) {
    return axios.post(userApi.login, params)
  },

  // 登出
  logout () {
    return axios.post(userApi.logout)
  },

  // 获取用户部分信息
  queryLimitedInfo (userId) {
    return axios.post(userApi.queryLimitedInfo, { userId })
  }
}
