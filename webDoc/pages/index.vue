<template>
  <section class="container">
    <div>
      <logo/>
      <h1 class="title">
        webDoc
      </h1>
      <h2 class="subtitle">
        My classy Nuxt.js project
      </h2>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green">Documentation</a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey">GitHub</a>
      </div>
    </div>
    <p>{{love.toString()}}</p>
    <p v-for="(item, index) in list" :key="index">{{index}}hello</p>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
import api from './../service/index.js'
const homeApi = api.home

export default {
  components: {
    Logo
  },
  asyncData ({ params }) {
    return homeApi.queryHomeNav().then(res => {
      console.log(res)
      return { love: res.data.data }
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
      console.log(res)
      this.list = res.data.data
    })
  }
}
</script>

<style lang="scss">
@import url('@/assets/css/common/common.scss');
$hello: green;

.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

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
