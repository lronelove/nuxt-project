import axios from 'axios'
import api from './api'

const homeApi = api.home

export default {
  queryHomeNav () {
    return axios.get(homeApi.homeNav)
  }
}