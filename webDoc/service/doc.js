/*
  和文章相关的接口
*/
import axios from 'axios'
import api from './api'

const docApi = api.doc

export default {
  // 每周分享接口
  share (pageNum, pageSize) {
    return axios.get(docApi.share + '?pageNum=' + pageNum + '&pageSize=' + pageSize)
  },

  // 获取文章的分类
  getCategory () {
    return axios.post(docApi.getCategory)
  },

  // 获取文章列表
  getArticleList (params) {
    return axios.post(docApi.getArticleList, params)
  },

  // 获取文章详情
  getArticle (params) {
    return axios.post(docApi.getArticle, params)
  }, 
}
