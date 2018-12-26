/*
  和文章相关的接口
*/
import axios from 'axios'
import api from './api'

const docApi = api.doc

export default {
  // 取消评论点赞
  unlikeIt (params) {
    return axios.post(docApi.unlikeIt, params)  
  },

  // 评论点赞
  likeIt (params) {
    return axios.post(docApi.likeIt, params)
  },

  // 文章回复一级评论的接口
  typeArticleReply (params) {
    return axios.post(docApi.typeArticleReply, params)
  },

  // 获取回复列表的函数 
  getReplyList (article_id, user_id) {
    return axios.post(docApi.getReplyList, { article_id, user_id })
  },

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
