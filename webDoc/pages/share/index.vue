<template>
  <div>
    <h2>this is share page</h2>
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
$hello: green;

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  // color: #35495e;
  color: $orange-color-5; // Hover
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  // color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
