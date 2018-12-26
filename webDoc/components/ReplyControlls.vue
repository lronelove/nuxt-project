<template>
  <div class="reply-controlls">
    <div class="buttons">
      <span>{{time}}</span>
      <div>
        <span>
          <img v-show="isSelfActive" @click="unlikeIt" src="./../static/images/good_active.png" alt="">
          <img v-show="!isSelfActive" @click="likeIt" src="./../static/images/good_unactive.png" alt="">
          <em class="count" v-show="selfLikeNum > 0">{{selfLikeNum}}</em>
        </span>
        <span class="last-span" @click="showReply">
          <img src="./../static/images/reply.png" alt="">
          <em>回复</em>
        </span>
      </div>
    </div>
    
    <div class="confrim-reply" v-show="isShow">
      <el-input
        class="top-input"
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="请输入内容"
        v-model="content">
      </el-input>
      <el-row class="pr el-row-lr">
        <el-button class="btn-confirm" type="success" @click="closeReply">确认</el-button></el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
  import api from './../service/index'
  import jsCookie from 'js-cookie'

  const docApi = api.doc

  export default {
    props: {
      id: { // 当前评论的id
        type: Number,
        required: true
      },
      likeNum: { // 点赞的总数
        type: Number,
        default: 0
      },
      isActive: { // 是否被点赞了
        type: Boolean,
        default: false
      },
      replyToId: { // 被评论者的id
        type: Number
      },
      time: { // 回复时间
        type: String,
        default: '刚刚'
      },
      replyId: { // 一级评论的id
        type: Number
      }
    },
    data () {
      return {
        content: '', // 消息回复的内容 
        isShow: false, // 是否展示输入消息框
        isSelfActive: false, // 自身点赞是否激活，设置该变量原因是，直接操作props里的数据会报错
        selfLikeNum: 0,  // 点赞的个数   
      }
    },

    created () {
      this.isSelfActive = this.$props.isActive
      this.selfLikeNum = this.$props.likeNum
    },

    methods: {
      validateLike (userId) {
        if ( !userId ) {
          this.$message({
            message: '登录之后可以点赞',
            type: 'warning'
          })

          return false
        }

        return true
      },

      // 取消点赞
      unlikeIt () {
        const userId = jsCookie.get('userId') // 用户id
        const replyId = this.$props.id // 当前回复的id
        const isValidate = this.validateLike(userId) // 是否满足验证

        if ( !isValidate ) return false
        docApi.unlikeIt({ userId, replyId }).then(res => {
          if (res.data.code === 0) {
             this.isSelfActive = !this.isSelfActive // 切换点赞图片
             this.selfLikeNum-- // 点赞数减一
          } else {
            this.$message({
              message: res.data.msg,
              type: 'warning'
            })
          }
        })
      },

      // 点赞
      likeIt () {
        const userId = jsCookie.get('userId') // 用户id
        const replyId = this.$props.id // 当前回复的id
        const isValidate = this.validateLike(userId) // 是否满足验证

        if ( !isValidate ) return false  
        docApi.likeIt({ userId, replyId }).then(res => {
          if (res.data.code === 0) {
            this.isSelfActive = !this.isSelfActive // 切换点赞图片
            this.selfLikeNum++ // 点赞数加一
            console.log(this.selfLikeNum)
          } else {
            this.$message({
              message: res.data.msg,
              type: 'warning' 
            })
          }
        })
      },

      // 展开回复框
      showReply () {
        this.isShow = !this.isShow
      },

      // 关闭回复框
      closeReply () {
        this.isShow = false
        this.$emit('replyAgain', {
          replyId: this.$props.replyId,
          content: this.content,
          replyToId: this.$props.replyToId
        })
        this.content = '' // 清空评论
      }
    }
  }
</script>

<style lang="scss" scoped>
@import url('@/assets/css/common/common.scss');

.count {
  margin-left: 5px;
  position: relative;
  top: 2px;
}

.el-row-lr {
  height: 36px;
}

.btn-confirm {
  display: block;
  width: 60px;
  height: 26px;
  margin-top: 15px;
  position: absolute;
  right: 0;
}

.buttons {
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;

  span {
    color: $gray-color-7;
    
    em {
      font-style: normal;
    }
  }

  > div {
    > span {
      cursor: pointer;
    }
  }

  .last-span {
    margin-left: 50px;
  }

  img {
    width: 20px;
    height: 20px;
  }
}
</style>

