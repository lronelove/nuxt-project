<template>
  <div class="share-wrap">
    <div class="share container">
      <h1>每周分享</h1>
      <p class="total">已累计{{total}}次技术分享，以下的分享的文档纪录</p>

      <div class="content">
          <div v-for="(item, index) in list" :key="index" class="item">
            <h2>{{item.title}}</h2>
            <ul>
              <nuxt-link
                tag="li" 
                v-for="(article, articleIndex) in item.articles" 
                :key="articleIndex"
                :to="{ path: '/doc', query: { category_id: article.category_id, article_id: article.id } }"
              >
                <h3>{{article.title}}</h3>
                <p class="desc wordHidden twoline">{{article.content}}</p>
                <p class="name">分享人： {{article.username}}</p>
              </nuxt-link>
            </ul>
          </div>
      </div>      
    </div>

    <div class="pr pagination-wrap">
      <el-pagination
              class="pagination"
              background
              :page-count="pagination.pageCount"
              :current-page="pagination.currentPage"
              layout="prev, pager, next"
              @current-change="queryArticleList"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import api from './../../service/index.js'
const docApi = api.doc

export default {
  data () {
    return {
      list: [], // 分享列表数据
      pagination: { // 分页器相关配置
        currentPage: 1, // 当前页
        pageCount: 10, // 总页数
        pagerCount: 4 // 分页器总数         
      },
      total: 0 // 分享的次数
    }
  },
  methods: {
    // 初始化函数
    init() {
      this.querySharings(1)
    },

    // 查询每周分享的数据
    querySharings (pageNum, pageSize = 3) {
      docApi.share(pageNum, pageSize).then(res => {
        let data = res.data.data
        this.list = data.shareList
        this.pagination.pageCount = Math.ceil(data.totalCount / pageSize)
        this.total = data.totalCount
      })
    },

    // 搜索文章列表
    queryArticleList (currentPage) {
      this.querySharings(currentPage)
    }
  },
  created () {
    this.init()    
  }
}
</script>

<style lang="scss" scoped>
@import url('@/assets/css/common/common.scss');

/*! 具体内容模块*/
.pagination-wrap {
  height: 40px;
}

.pagination {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.content {
  margin-top: 100px;

  .item {
    margin-bottom: 140px;
    cursor: pointer;  

    h2 {
      color: $orange-color-6;
      font-size: 38px;
      font-weight: normal;
      text-align: center;
    }

    ul {
      li {
        border-bottom: 1px dashed $gray-color-5;
        padding-top: 50px;
        padding-bottom: 30px;

        h3 {
          font-size: 30px;
          font-weight: normal;
          margin-bottom: 40px;
        }

        p {
          color: #333;
        }

        p.desc {
          line-height: 22px;
          font-size: 14px;
          height: 44px;
        }

        p.name {
          margin-top: 30px;
          font-size: 14px;
        }
      }
    }
  }
}

/*! 头部模块*/
.share {
  padding-top: 70px;

  h1 {
    text-align: center;
    font-size: 52px;
    font-weight: normal;
  }

  .total {
    margin-top: 30px;
    text-align: center;
    font-size: 20px;
  }
}
</style>
