<template>
  <div>
    <!-- 导航模块 -->
    <nav class="nav">
      <ul class="container">
        <li><a href="#">开发规范</a></li>
        <li><a href="#">测试规范</a></li>
        <li><a href="#">设计规范</a></li>
        <li><a href="#">发布规范</a></li>
        <li><a href="#">工具推荐</a></li>
        <li><a href="#">知识库</a></li>
        <li><a href="#">其它</a></li>
      </ul>
    </nav>

    <!-- 主体部分 -->
    <article class="main-wrap">
      <div class="container main">
        <div class="left">
            <el-autocomplete
              class="inline-input input-search"
              v-model="searchValue"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              @select="handleSelect"
            >
            </el-autocomplete>

            <div class="article-list">
              <ul>
                <li><a href="#" class="active">设计规范1</a></li>
                <li><a href="#">设计规范2</a></li>
                <li><a href="#">设计规范3</a></li>
                <li><a href="#">设计规范4</a></li>
                <li><a href="#">设计规范5</a></li>
                <li><a href="#">设计规范6</a></li>
                <li><a href="#">设计规范7</a></li>
                <li><a href="#">设计规范8</a></li>
                <li><a href="#">设计规范9</a></li>
                <li><a href="#">设计规范10</a></li>
              </ul>  
            </div>

            <el-pagination
              small
              background
              :page-count="pagination.pageCount"
              :current-page="pagination.currentPage"
              layout="prev, pager, next"
              @current-change="queryArticleList"
            >
            </el-pagination>
        </div>
        <div class="right">
          <h2>介紹</h2>
          <p>lronelove 发布于1小时前</p>

          <!-- 下面是文章的具体内容 -->
          <div class="content">
            下面是文章的具体内容
          </div>

          <!-- 下面是回复的内容 -->
          <div class="reply">
            <h2>评论</h2>

            <!-- 顶部输入模块 -->
            <div class="type-reply">
              <img src="http://img2.imgtn.bdimg.com/it/u=3260609003,3965213395&fm=26&gp=0.jpg" alt="头像">
              <el-input
                class="top-input"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入内容"
                v-model="reply">
              </el-input>
            </div>

            <!-- 回复列表模块 -->
            <div class="reply-list">
              <div class="reply-item">
                <div class="item-left">
                  <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=735113195,958349734&fm=200&gp=0.jpg" alt="">
                </div>
                <div class="item-right">
                  <p class="name">大东</p>
                  <p class="item-content">有报错，怎么解决？</p>
                  <ReplyControlls></ReplyControlls>  

                  <!-- 二次回复列表模块 -->
                  <div class="reply-again-list">
                    <div class="reply-again">
                     <div class="reply-to">
                       <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=735113195,958349734&fm=200&gp=0.jpg" alt="">
                       <span class="to-name">大佬</span>
                       <span>回复</span>
                       <span class="to-name">lronelove</span>
                       <span>:</span>
                     </div>
                     <p>其实吧，我也不知道，问百度比较好</p> 
                    </div>
                  </div>

                </div>
              </div>

              <div class="reply-item">
                <div class="item-left">
                  <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=735113195,958349734&fm=200&gp=0.jpg" alt="">
                </div>
                <div class="item-right">
                  <p class="name">大东</p>
                  <p class="item-content">有报错，怎么解决？</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article> 
  </div>
</template>

<script>
import ReplyControlls from '@/components/ReplyControlls.vue'

import api from './../../service/index.js'
const homeApi = api.home

export default {
  data () {
    return {
      reply: '', // 回复的内容
      searchValue: '', // 搜索框的内容
      recommendArticles: [],
      pagination: {
        currentPage: 1, // 当前页
        pageCount: 10, // 总页数
        pagerCount: 6 // 分页器总数         
      }
    }
  },
  components: {
    ReplyControlls
  },
  methods: {
    // 查询推荐文章
    querySearch (queryString, cb) {
      let res = [
        {
          "value": "be happy",
          "id": 1
        },
        {
          "value": "love yourself",
          "id": 2 
        }
      ]
      cb(res)
      return res
    },

    // 选中搜索框推荐文章
    handleSelect (item) {
      console.log(item)
    },

    // 搜索文章列表
    queryArticleList (currentPage) {
      console.log(currentPage)
    }
  },
  created () {
  }
}
</script>

<style scoped lang="scss">
@import url('@/assets/css/common/common.scss');

$imageWidth: 44px;

/*! 主体部分样式*/
.reply-again {
  margin-top: 20px;
  padding: 20px;
  background: rgba(250, 251, 252, 1);
  
  .reply-to {
    display: flex;
    color: $gray-color-8;

    .to-name {
      padding-left: 10px;
      padding-right: 10px;
      color: #333;
      font-size: 16px;
    } 
  }

  > p {
      font-size: 12px;
      text-indent: 54px;
  }
}

.reply-item {
  padding: 15px;
  border-bottom: 1px solid $gray-color-5;
  margin-bottom: 20px;
  display: flex;

  img {
    width: $imageWidth;
    height: $imageWidth;
    border-radius: $imageWidth / 2;
  }

  .item-right {
    padding-left: 10px;
    padding-right: 10px;
    width: 700px;

    .name {
      font-size: 18px;
      line-height: 22px;
    }

    .item-content {
      margin-top: 10px;
      line-height: 18px;
      font-size: 14px;
    }
  }
}

.reply-list {
  padding: 30px;
}

.type-reply {
  display: flex;
  background: rgba(250, 251, 252, 1);
  padding: 20px;
  border-radius: 4px;

  img {
    width: $imageWidth;
    height: $imageWidth;
    border-radius: 50%;
  }

  .top-input {
    width: 755px;
    margin-left: 11px;
    min-height: 50px;
  }
} 

.reply {
  margin-top: 150px;

  > h2 {
    font-size: 22px;
    text-align: center;
    color: $gray-color-8;
    font-weight: normal;
    letter-spacing: 1px;
  }
}

.article-list {
  margin-top: 20px;
  margin-bottom: 20px;

  ul {
    li {
      a {
        color: black;
        line-height: 30px;
        display: block;
        height: 30px;
        font-size: 12px;
      }
      a.active {
        color: #6ebbff;
      }
    }
  }
}

.main {
  display: flex;

  > .left {
    padding-top: 20px;
    width: 310px;
  }

  > .right {
    padding-top: 20px;
    width: 890px;

    > h2 {
      font-size: 38px;
      font-weight: 600;
      margin-bottom: 15px;
    }

    > p {
      margin-bottom: 20px;
      font-size: 16px;
      color: $gray-color-8;
    }
  }
}

/*! 导航模块*/
.nav {
  height: 40px;
  font-size: 16px;
  background: #ccc; // Background

  ul {
    display: flex;
    justify-content: flex-end;

    li {

      a {
        display: block;
        height: 40px;
        line-height: 40px;
        padding-left: 20px;
        padding-right: 20px;
        color: black;

        &:hover {
          background: #333;
          color: white;
        }
      }
    }
  }
}
</style>
