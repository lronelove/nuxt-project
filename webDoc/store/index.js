import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    avatarImage: '', // 头像图片
    isFirstVisit: true // 是否是第一次访问
  },
  mutations: {
    // 设置头像
    setAvatarImage (state, avatarImage) {
      state.avatarImage = avatarImage
    },

    // 是否第一次访问
    setIsFirstVisit (state, flag) {
      state.isFirstVisit = flag
    }
  }
})

export default store