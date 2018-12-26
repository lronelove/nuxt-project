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
    'getReplyList': version1Prefix + 'article/reply/get', // 获取评论列表
    'typeArticleReply': version1Prefix + 'article/reply/post', // 文章的一級评论的接口
    'likeIt': version1Prefix + 'article/reply/likeIt', // 点赞接口
    'unlikeIt': version1Prefix + 'article/reply/unlikeIt', // 取消点赞接口
  },
  'user': {
    'login': version1Prefix + 'login', // 登录接口
    'logout': version1Prefix + 'logout', // 退出登录
    'queryLimitedInfo': version1Prefix + 'user/queryLimitedInfo', // 获取用户部分信息 
  }
}
