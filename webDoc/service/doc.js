/*
  和文章相关的接口
*/
import axios from 'axios'
import api from './api'

const docApi = api.doc

export default {
  // 每周分享接口
  share (pageNo, pageLength) {
    return axios.get(docApi.share + '?pageNo=' + pageNo + '&pageLength=' + pageLength)
  }
}
