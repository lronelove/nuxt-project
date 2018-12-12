<template>
  <div class="reply-controlls">
    <div class="buttons">
      <span>6小时前</span>
      <div>
        <span><img src="./../static/images/good_unactive.png" alt=""></span>
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
        v-model="reply">
      </el-input>
      <el-row class="pr el-row-lr">
        <el-button class="btn-confirm" type="success" @click="closeReply">确认</el-button></el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        isShow: false, // 是否展示输入消息框
        reply: '' // 消息回复的内容
      }
    },

    methods: {
      // 展开回复框
      showReply () {
        this.isShow = !this.isShow
      },

      // 关闭回复框
      closeReply () {
        this.isShow = false
      }
    }
  }
</script>

<style lang="scss" scoped>
@import url('@/assets/css/common/common.scss');

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

