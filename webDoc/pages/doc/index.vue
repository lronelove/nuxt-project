<template>
  <div>
    <!-- 导航模块 -->
    <nav class="nav">
      <ul class="container">
        <li v-for="(item, index) in navList" :key="index">
          <a href="#" 
            @click="changeCategory(item.id, index)" 
            :class="{'active': activeNavIndex === index }"
          >
            {{item.category_name}}
          </a>
        </li>
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

            <!-- 推荐文章列表 -->
            <div class="article-list">
              <ul>
                <li v-for="(item, index) in recommendArticles" :key="index" @click="changeArticle(item.id, index)">
                  <a href="#" :class="{'active': activeArticleIndex === index }">{{item.title}}</a>
                </li>
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

        <!-- 详细文章内容及其评论模块 -->
        <div class="right">
          <h2>{{articleDetails.title}}</h2>
          <p>{{articleDetails.author}} 发布于{{articleDetails.showTime}}</p>

          <!-- 下面是文章的具体内容 -->
          <div class="content">
            {{articleDetails.content}}
          </div>

          <!-- 下面是回复的内容 -->
          <div class="reply">
            <h2>评论</h2>

            <!-- 顶部输入模块 -->
            <div class="type-reply">
              <img :src="avatarImage" alt="头像">
              <el-input
                class="top-input"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入内容"
                v-model="reply"
              >
              </el-input>
              <el-row class="pr el-row-lr">
                <el-button class="btn-confirm" type="success" @click="typeArticleReply">确认</el-button>
              </el-row>
            </div>

            <!-- 回复列表模块 -->
            <div class="reply-list">
              <div v-for="(item, index) in replyList" :key="index" class="reply-item">
                <div class="item-left">
                  <img :src="item.user_info.avatar_image" alt="">
                </div>
                <div class="item-right">
                  <p class="name" @click="chooseReplyPerson(item.user_info.user_id)">{{item.user_info.username}}</p>
                  <p class="item-content">{{item.content}}</p>
                  <ReplyControlls
                    :isActive="item.isActive"
                    :likeNum="item.likeNum"
                    :replyToId="item.user_info.user_id"  
                    :time="item.create_time"
                    :replyId="item.id"
                    :id="item.id"   
                    v-on:replyAgain="replyAgain"
                    >
                  </ReplyControlls>  

                  <!-- 二次回复列表模块 -->
                  <div class="reply-again-list">
                    <div v-for="(innerItem, innerIndex) in item.list" :key="innerIndex" class="reply-again" >
                     <div class="reply-to">
                       <img :src="innerItem.user_info.avatar_image" alt="">
                       <span class="to-name">{{innerItem.user_info.username}}</span>
                       <span>回复</span>
                       <span class="to-name">{{innerItem.resp_info.username}}</span>
                       <span>:</span>
                     </div>
                     <p>{{innerItem.content}}</p>
                     <ReplyControlls
                      :isActive="innerItem.isActive"
                      :likeNum="innerItem.likeNum"
                      :replyToId="innerItem.user_info.user_id" 
                      :time="innerItem.create_time"
                      :replyId="item.id"
                      :id="innerItem.id"  
                      v-on:replyAgain="replyAgain"
                     >
                     </ReplyControlls> 
                    </div>
                  </div>

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

import jsCookie from 'js-cookie'
import api from './../../service/index.js'

const docApi = api.doc
const userApi = api.user
let query = {}

export default {
  data () {
    return {
      replyList: [], // 回复列表
      isInit: true, // 是否是初始化
      articleDetails: {
      }, // 文章详情
      activeNavIndex: -1, // 当前选中的分类下标
      navList: [
      ], // 导航列表
      reply: '', // 一级回复的内容
      searchValue: '', // 搜索框的内容
      recommendArticles: [], // 文章列表
      activeArticleIndex: 0, // 当前选中的文章下标
      pagination: {
        currentPage: 1, // 当前页
        pageCount: 10, // 总页数
        pagerCount: 6 // 分页器总数         
      },
      query: {
        category_id: '',
        article_id: ''
      }
    }
  },

  components: {
    ReplyControlls
  },

  beforeRouteLeave (to, from, next) {
    next()
  },

  methods: {
    // 回复评论
    replyAgain (data) {
      const article_id = this.recommendArticles[this.activeArticleIndex].id // 当前文章的id
      const reply_from_id = jsCookie.get('userId') // userId 评论者id
      const reply_id = data.replyId // 一级评论的id
      const content = data.content // 一级评论的内容
      const reply_to_id = data.replyToId
      const isValidate = this.validateTypeArticleReply(article_id, reply_from_id, content) // 是否满足验证

      if ( !isValidate ) return false
      docApi.typeArticleReply({ 
        article_id,
        reply_from_id,
        reply_id,
        content,
        reply_to_id
      }).then(res => {
        if (res.data.code === 0) {
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
          this.getReplyList(article_id) // 刷新评论列表
        } else {
          this.$message({
            message: res.data.msg,
            type: 'warning'
          })
        }
      })
    },

    // 编写文章的评论的验证
    validateTypeArticleReply (article_id, reply_from_id, content) {
      if ( !article_id ) { // 评论文章不存在
        this.$message({
          message: '评论的文章不存在',
          type: 'warning'
        })

        return false
      }

      if ( !reply_from_id ) { // 未登录
        this.$message({
          message: '登录之后才可以评论',
          type: 'warning'
        })

        return false
      }

      if ( !content ) {
        this.$message({
          message: '评论内容不能为空',
          type: 'warning'
        })

        return false
      }

      return true
    },

    // 编写文章的评论
    typeArticleReply () {
      const article_id = this.recommendArticles[this.activeArticleIndex].id // 当前文章的id
      const reply_from_id = jsCookie.get('userId')
      const content = this.reply

      const isValidate = this.validateTypeArticleReply(article_id, reply_from_id, content) // 是否满足验证

      if ( !isValidate ) return false
      docApi.typeArticleReply({ article_id, reply_from_id, content }).then(res => {
        if (res.data.code === 0) {
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
          this.reply = '' // 清空回复
          this.getReplyList(article_id) // 刷新评论列表
        } else {
          this.$message({
            message: res.data.msg,
            type: 'warning'
          })
        }
      })
    },

    // 重置
    reset () {
      this.activeNavIndex = -1 // 导航不选中
      this.activeArticleIndex = 0 // 文章默认激活第一条
    },

    // 点击推荐文章列表，切换内容
    changeArticle ( id, index ) {
      this.activeArticleIndex = index // 切换列表激活样式
      this.getArticle(id) // 获取文章详情
    },

    // 切换分类
    changeCategory ( id, index ) {
      const params = {
        categoryId: id
      }
      this.activeNavIndex = index
      this.renderArticleList(params)
    },

    // 查询推荐文章
    querySearch ( queryString, cb ) {
      const params = {
        queryTitle: queryString
      }
      let list = []

      docApi.getArticleList(params).then(res => {
        const data = res.data.data.resultList

        for (let i = 0, len = data.length; i < len; i++) {
          list.push({
            "value": data[i].title,
            "id": data[i].id,
            "category_id": data[i].category_id,
            "title": data[i].title
          })
        }
      })
      cb(list)
      return list
    },

    // 选中搜索框推荐文章
    handleSelect ( item ) {
      this.recommendArticles = [item] // 推荐文章列表只有一个
      this.reset() // 重置
      this.getArticle(item.id)
    },

    // 点击分页器 搜索文章列表
    queryArticleList ( currentPage ) {
      const category_id = this.query.category_id || null
      const params = {
        categoryId: category_id,
        pageNo: currentPage
      }
      this.renderArticleList(params) // 渲染文章列表
    },

    // 获取文章分类
    getCategory () {
      docApi.getCategory().then(res => {
        this.navList = res.data.data.resultList
      })
    },

    // 通过文章id获取在推荐列表里面的下标
    getIndexById ( article_id ) {
      for (let i = 0, len = this.recommendArticles.length; i < len; i++) {
        if (this.recommendArticles[i].id === article_id) {
          return i
        }
      }

      return 0
    },

    // 渲染文章列表
    renderArticleList ( params ) {
      docApi.getArticleList(params).then(res => {
        if (res.data.code !== 0) {
          this.$message({
            message: res.data.msg,
            type: 'warning',
            duration: 2000
          })
        } else {
          const data = res.data.data
          this.recommendArticles = data.resultList
          const { totalCount, pageLength } = data.paginator
          this.pagination.pageCount = Math.ceil( totalCount / pageLength )
          let id = this.recommendArticles[0].id // 如果query没有文章id，那么默认选中第一条

          if ( this.query.article_id && this.isInit ) { // 如果初始化的时候query里面有article_id
            id = this.query.article_id
            this.activeArticleIndex = this.getIndexById(id)
          }
          if ( id ) this.getArticle(id) // 默认获取第一篇文章
        }
      })
    },
    
    // 获取文章列表
    getArticleList () {
      const category_id = this.query.category_id || null
      const params = {
        categoryId: category_id
      }
      this.renderArticleList(params)
    },

    // 初始化获取query里面的参数
    getQuery () {
      this.query.category_id = query.category_id
      this.query.article_id = query.article_id
      console.log('this query')
      console.log(query)
      this.activeNavIndex = this.query.category_id || -1 // 初始化的时候设置当前主分类
    },

    // 获取文章详情 
    getArticle ( articleId ) {
      docApi.getArticle({ articleId }).then(res => {
        if (res.data.code === 0) {
          this.articleDetails = res.data.data // 获取文章详情
          this.getReplyList(res.data.data.id) // 获取回复列表
        }
      })
    },

    // 获取评论的列表函数 lronelove
    getReplyList ( article_id ) {
      const user_id = jsCookie.get('userId')
      docApi.getReplyList(article_id, user_id).then(res => {
        if (res.data.code === 0) {
          this.replyList = res.data.data.list.reverse()
        }
      })
    },

    // 初始化函数
    init () {
      console.log('created')
      this.getCategory() // 获取文章分类
      this.getQuery() // 初始化获取query里面的参数 
      this.getArticleList() // 获取文章列表
      this.isInit = false // 初始化完成了 
    }
  },

  asyncData({ route }) {
    query = route.query
    console.log('asyncData')
    console.log(query)
    return {}
  },

  created () {
    this.init()
  },

  computed: {
    // 头像，在store里面获取，没有的话，那么使用默认头像
    avatarImage () {
      return this.$store.state.avatarImage || require('../../static/images/default_avatar.jpg')
    }
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

      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    } 
  }

  > p {
      font-size: 12px;
      text-indent: 54px;
  }
}

.content {
  min-height: 300px;
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

      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
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
  flex-wrap: wrap;

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
  min-height: 300px;

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

.el-row-lr {
  height: 36px;
  width: 100%;
}

.btn-confirm {
  display: block;
  width: 60px;
  height: 26px;
  margin-top: 15px;
  position: absolute;
  right: 40px;
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

      a.active {
         background: #333;
         color: white;
      }
    }
  }
}
</style>
