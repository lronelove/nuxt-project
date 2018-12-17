const version1Prefix = 'api/v1/'

export default {
  'home': {
    'homeNav': version1Prefix + 'home/nav', // 首页导航数据接口
    'homeRecommend': version1Prefix + 'home/recommend' // 首页推荐数据接口
  },
  'doc': {
    'share': version1Prefix + 'share', // 每周分享表页面
    'getCategory': version1Prefix + 'category/getCategory', // 获取文章分类列表 article/getArticleList
    'getArticleList': version1Prefix + 'article/getArticleList', // 获取文章列表
    'getArticle': version1Prefix + 'article/getArticle', // 获取文章详情
  }
}
