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
          <li><a href="#">首页</a></li>
          <li><a href="#">开发规范</a></li>
          <li><a href="#">组件文档</a></li>
          <li><a href="#">每周分享</a></li>
          <li><a href="#">工具推荐</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TheHead'
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


