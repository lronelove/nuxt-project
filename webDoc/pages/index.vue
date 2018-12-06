<template>
  <div class="home">
    <!-- banner图模块   -->
    <div class="banner-wrap">
      <div class="banner container">
        <div class="left">
          <h1>SEGE 四格互联文档库</h1>
          <p>是SEGI团队面向内部前端研发小伙伴提供的一个开发规范平台，包含了开发规范、公司内部组件文档、每周分享、开发工具推荐等</p>
          <div class="button">
            <a href="#">快速开始</a>
          </div>
        </div>
        <div class="right">
          <img src="../static/images/home-banner.png" alt="home-banner">
        </div>
      </div>
    </div>

    <!-- 推荐分类模块 -->
    <div class="rec-wrap">
      <div class="rec container clearFix">
        <div class="item">
          <h3>开发规范</h3>
          <p>主要包括五部分内容：PC规范、移动端规范、性能优化、等。</p>
          <ul>
            <li><a href="#">html规范</a></li>
            <li><a href="#">css规范</a></li>
            <li><a href="#">js规范</a></li>
            <li><a href="#">动画优化</a></li>
            <li><a href="#">接口规范</a></li>
            <li><a href="#">加载优化</a></li>
            <li><a href="#">重构规范</a></li>
            <li><a href="#">页面加载优化</a></li>
          </ul>
        </div>

        <div class="item">
          <h3>开发规范</h3>
          <p class="wordHidden twoline">主要包括五部分内容：PC规范、移动端规范、性能优化、等。</p>
          <ul>
            <li><a href="#">html规范</a></li>
            <li><a href="#">css规范</a></li>
            <li><a href="#">js规范</a></li>
            <li><a href="#">动画优化</a></li>
            <li><a href="#">接口规范</a></li>
            <li><a href="#">加载优化</a></li>
            <li><a href="#">重构规范</a></li>
            <li><a href="#">页面加载优化</a></li>
          </ul>
        </div>

        <div class="item">
          <h3>开发规范</h3>
          <p class="wordHidden twoline">主要包括五部分内容：PC规范、移动端规范、性能优化、等。</p>
          <ul>
            <li><a href="#">html规范</a></li>
            <li><a href="#">css规范</a></li>
            <li><a href="#">js规范</a></li>
            <li><a href="#">动画优化</a></li>
            <li><a href="#">接口规范</a></li>
            <li><a href="#">加载优化</a></li>
            <li><a href="#">重构规范</a></li>
            <li><a href="#">页面加载优化</a></li>
          </ul>
        </div>

        <div class="item">
          <h3>开发规范</h3>
          <p class="wordHidden twoline">主要包括五部分内容：PC规范、移动端规范、性能优化、等。</p>
          <ul>
            <li><a href="#">html规范</a></li>
            <li><a href="#">css规范</a></li>
            <li><a href="#">js规范</a></li>
            <li><a href="#">动画优化</a></li>
            <li><a href="#">接口规范</a></li>
            <li><a href="#">加载优化</a></li>
            <li><a href="#">重构规范</a></li>
            <li><a href="#">页面加载优化</a></li>
          </ul>
        </div>

        <div class="item">
          <h3>开发规范</h3>
          <p class="wordHidden twoline">主要包括五部分内容：PC规范、移动端规范、性能优化、等。</p>
          <ul>
            <li><a href="#">html规范</a></li>
            <li><a href="#">css规范</a></li>
            <li><a href="#">js规范</a></li>
            <li><a href="#">动画优化</a></li>
            <li><a href="#">接口规范</a></li>
            <li><a href="#">加载优化</a></li>
            <li><a href="#">重构规范</a></li>
            <li><a href="#">页面加载优化</a></li>
          </ul>
        </div>

        <div class="item">
          <h3>开发规范</h3>
          <p class="wordHidden twoline">主要包括五部分内容：PC规范、移动端规范、性能优化、等。</p>
          <ul>
            <li><a href="#">html规范</a></li>
            <li><a href="#">css规范</a></li>
            <li><a href="#">js规范</a></li>
            <li><a href="#">动画优化</a></li>
            <li><a href="#">接口规范</a></li>
            <li><a href="#">加载优化</a></li>
            <li><a href="#">重构规范</a></li>
            <li><a href="#">页面加载优化</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from './../service/index.js'
const homeApi = api.home

export default {
  asyncData ({ params }) {
    return homeApi.queryHomeNav().then(res => {
      return { list: params }
    })
  },
  data () {
    return {
      list: [1, 2, 3],
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

/*!推荐模块*/
.rec {
  min-height: 550px;

  .item {
    padding: 20px;
    width: 270px;
    height: 230px;
    float: left;
    background: white;
    overflow: hidden;
    margin-bottom: 30px;
    margin-left: 40px;
    transition: all .3s;
    border-radius: $borderRadius;

    &:hover {
      cursor: pointer;
      box-shadow: 6px 6px 4px rgba(0, 0, 0, .1), -6px -6px 4px rgba(0, 0, 0, .1);
      transform: translateX(-2px);
    }

    h3 {
      font-size: 20px;
      margin-bottom: 15px;
    }

    p {
      color: #707070;
      font-size: 12px;
      line-height: 18px;
      margin-bottom: 20px;
    }

    ul {
      display: flex;
      flex-wrap: wrap;

      li {
        margin-right: 10px;
        line-height: 30px;
        height: 30px;

        a {
          color: #2d8cf0;
          transition: color .3s ease;
          font-size: 12px;

          &:hover {
            color: #57a3f3;
          }
        }
      }
    }
  }
  .item:nth-child(4n - 3) {
    margin-left: 0;
  }
}

.rec-wrap {
  background: #F0F3F6;
  padding-top: 30px;
}

/*!banner */
.banner {
  display: flex;
  justify-content: space-between;

  .left {
    width: 627px;
    height: 400px;
    padding-top: 100px;

    h1 {
      font-weight: normal;
      color: white;
      font-size: 36px;
    }

    p {
      color: white;
      font-size: 14px;
      line-height: 22px;
      margin-top: 20px;
    }

    .button {
      padding-top: 30px;

      a {
        display: block;
        background: #00A0E9;
        color: white;
        border-radius: $borderRadius;
        width: 120px;
        line-height: 35px;
        height: 35px;
        text-align: center;
        letter-spacing: 1px;
        font-size: $fontSize-title;
        transition: background .2s ease;

        &:hover {
          background: #0090d2;
        }
      }
    }
  }

  .right {
    width: 300px;
    height: 400px;
    padding-top: 70px;
    display: flex;
    justify-content: flex-end;

    img {
      width: 204px;
      height: 262px;
    }
  }
}

.banner-wrap {
  height: 400px;
  background: #2B3A42;
}

</style>
