<template>
  <div>
    <iframe class="iframe" src="http://www.baidu.com" frameborder="0"></iframe>
  </div>
</template>

<script>
import api from './../../service/index.js'
const homeApi = api.home

export default {
  data () {
    return {
      list: [],
      love: ''
    }
  },
  methods: {
    log(info) {
    }
  },
  created () {
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
