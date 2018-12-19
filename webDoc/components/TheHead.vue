<template>
  <div class="head-wrap">
    <div class="head container">
      <div class="left">
        <nuxt-link to="/">
          <img src="./../static/images/logo.png" alt="">
        </nuxt-link>
      </div>

      <div class="right">
        <ul>
          <li v-for="(item, index) in list" :key="index">
            <nuxt-link :to="item.url">{{item.navName}}</nuxt-link>
          </li>
          <li>
            <a v-show="!isLogined" class="login" @click="dialogFormVisible = true"><span>登录</span></a>
            <a v-show="isLogined" class="login">
              <img src="https://upload.jianshu.io/users/upload_avatars/12450213/47c4e4e9-a15c-4163-878a-79662ff487ce?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120" alt="">
              <span @click="logout">退出</span>
            </a>
          </li>
        </ul>
      </div>

      <!-- 登录form表单模块 -->
      <el-dialog :visible.sync="dialogFormVisible" width="400px" :center="form.center">
        <el-form :model="form">
          <el-form-item label="用户名：" :label-width="formLabelWidth">
            <el-input v-model="form.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码：" :label-width="formLabelWidth">
            <el-input v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button 
            type="primary" 
            @click="login" 
            class="btn-confirm"
          >
            登录
          </el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import jsCookie from 'js-cookie'
  import api from './../service/index.js'

  const homeApi = api.home
  const userApi = api.user

  export default {
    name: 'TheHead',

    data () {
      return {
        isLogined: false, // 是否登录
        list: [], // 导航列表数据
        dialogFormVisible: false,
        form: {
          username: '',
          password: '',
          center: true
        },
        formLabelWidth: '70px'
      }
    },

    created () {
      this.init() // 初始化函数
    },

    methods: {
      // 登出
      logout () {
        jsCookie.remove('token')
        jsCookie.remove('userId')

        userApi.logout().then(res => {
          if (res.data.code === 0) {
            this.isLogined = false
            this.$message({
              message: '退出登录成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: '退出登录失败',
              type: 'warining'
            })
          }
        })
      },

      // 验证登录的信息
      isValidate () {
        if ( !this.form.username ) {
          this.$message({
            type: 'warning',
            message: '用户名不能为空'
          })

          return false
        }

        if ( !this.form.password ) {
          this.$message({
            type: 'warning',
            message: '密码不能为空'
          })

          return false
        }

        return true
      },

      // 处理登录成功的事件
      handleLogin (data) {
        this.dialogFormVisible = false
        this.isLogined = true // 登录成功
        
        jsCookie.set('token', data.token, { expires: 7 }) // 存储token
        jsCookie.set('userId', data.userId, { expires: 7 }) // 存储userId
        
        this.$message({
          message: '登录成功！',
          type: 'success'
        })
      },

      login () { // 登录
        let isValidate = this.isValidate()

        if ( !isValidate ) { // 初步验证不通过，直接返回
          return false
        }
        userApi.login(this.form).then(res => {
          if (res.data.code === 0) {
            const data = res.data.data
            this.handleLogin(data)
          }
        })
      },

      // 判断用户是否登录
      checkLogin () {
        let userId = jsCookie.get('userId')
        let token = jsCookie.get('token')

        if (userId && token) { // 同时存在
          this.isLogined = true
        }
      },

      // 查询用户的相关信息
      queryUserInfo () {

      },

      // 初始化函数
      init () {
        this.checkLogin() // 判断用户是否登录
        this.queryHomeNav() // 获取导航列表数据
      },

      // 获取导航模块数据
      queryHomeNav () {
        homeApi.queryHomeNav().then(res => {
          if (res.data.code === 0) {
            this.list = res.data.data
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
@import url('@/assets/css/common/common.scss');

.el-form-item {
  margin-top: 15px;
}

.btn-confirm {
  width: 60px;
  height: 26px;
}

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
            color: $blue-color-5;
          }
        }
      }
    }
  }
}

.login {
  cursor: pointer;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  span {
    margin-left: 10px;
  }
}
</style>


