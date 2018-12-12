<template>
  <div class="head-wrap">
    <div class="head container">
      <div class="left">
        <nuxt-link to="/">
          <img src="./../static/images/logo.png" alt="">
        </nuxt-link>
      </div>

      <div class="right">
        <ul>
          <li v-for="(item, index) in list" :key="index"><nuxt-link :to="item.url">{{item.navName}}</nuxt-link></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import api from './../service/index.js'
  const homeApi = api.home

  export default {
    name: 'TheHead',

    data () {
      return {
        list: [] // 导航列表数据
      }
    },

    created () {
      this.init() // 初始化函数
    },

    methods: {
      // 初始化函数
      init () {
        this.queryHomeNav() // 获取导航列表数据
      },

      // 获取导航模块数据
      queryHomeNav () {
        homeApi.queryHomeNav().then(res => {
          if (res.data.code === 0) {
            this.list = res.data.data
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
@import url('@/assets/css/common/common.scss');

.head-wrap {
  height: 70px;
  background: #333;
}
.head {
  height: 70px;
  display: flex;
  justify-content: space-between;

  .left {
    a {
      display: block;
      padding-top: 15px;

      img {
        height: 40px;
      }
    }
  }

  .right {
    ul {
      display: flex;

      li {
        margin-left: 10px;

        a {
          display: block;
          height: 70px;
          line-height: 70px;
          padding-left: 20px;
          padding-right: 20px;
          color: white;
          font-size: $fontSize-title;

          &:hover {
            color: $blue-color-5;
          }
        }
      }
    }
  }
}
</style>


