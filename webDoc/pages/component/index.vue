<template>
  <div>
    <iframe class="iframe" src="http://www.baidu.com" frameborder="0"></iframe>
  </div>
</template>

<script>
import api from './../../service/index.js'
const homeApi = api.home

export default {
  asyncData ({ params }) {
    console.log(params)
    return homeApi.queryHomeNav().then(res => {
      console.log(res)
      return { list: params }
    })
  },
  data () {
    return {
      list: [],
      love: ''
    }
  },
  methods: {
    log(info) {
      console.log(homeApi)
    }
  },
  created () {
    console.log(api)
    homeApi.queryHomeNav().then(res => {
      // console.log(res)
      // this.list = res.data.data
    })
  }
}
</script>

<style lang="scss">
@import url('@/assets/css/common/common.scss');

.iframe {
  width: 100%;
  min-height: 823px
}
</style>
