import axios from 'axios'
import api from './api'

const homeApi = api.home

export default {
  // 查询首页导航
  queryHomeNav () {
    return axios.get(homeApi.homeNav)
  },

  // 查询首页推荐
  queryHomeRecommend () {
    return axios.get(homeApi.homeRecommend)
  }
}
