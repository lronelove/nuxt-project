<template>
  <div class="head-wrap">
    <div class="head container">
      <div class="left">
        <a href="#">
          <img src="./../static/logo.png" alt="">
        </a>
      </div>

      <div class="right">
        <ul>
          <li v-for="(item, index) in list" :key="index"><a :href="item.url">{{item.name}}</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TheHead',
    data () {
      return {
        list: [
          {
            url: '#',
            name: '首页'
          },
          {
            url: '#',
            name: '开发规范'
          },
          {
            url: '#',
            name: '组件文档'
          },
          {
            url: '#',
            name: '每周分享'
          },
          {
            url: '#',
            name: '工具推荐'
          },
        ]
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
            color: $orange-color-5;
          }
        }
      }
    }
  }
}
</style>


