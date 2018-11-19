<template>
  <div class="header">
    <div class="menu">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="首页" name="first"></el-tab-pane>
        <el-tab-pane label="关于我" name="third"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="login_register">
      <div class="login_button">
      <!-- Form_Login -->
      <el-button type="text" @click="dialogFormVisible_login = true" v-if = "isShow">登录</el-button>
      <el-dialog title="" :visible.sync="dialogFormVisible_login">
        <el-form :model="form_login">
          <el-form-item  >
            <el-input  v-model="form_login.name" autocomplete="off" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item  >
            <el-input type="password" v-model="form_login.password" autocomplete="off" placeholder="密码"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="login()" class = "form_login">登录</el-button>
        </div>
      </el-dialog>
     </div>
      <div class="register_button">
      <!-- Form_Register -->
      <el-button type="text" @click="dialogFormVisible_register = true" v-if = "isShow">注册</el-button>
      <el-dialog title="" :visible.sync="dialogFormVisible_register">
        <el-form :model="form_register">
          <el-form-item  >
            <el-input v-model="form_register.name" autocomplete="off" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item >
            <el-input  type="password" v-model="form_register.password" autocomplete="off" placeholder="密码"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="register()" class = "form_register">注册</el-button>
        </div>
      </el-dialog>
        <div class = "isLogin_text" v-if="isLogin" @click = "manageBlog()">
          {{userName}}
        </div>
        <div class = "isAdmin_text" v-if="isAdmin">
          <span type="text" @click = "toWrite()">写博客</span>
        </div>
        <div class = "isOut_text" v-if="isOut">
          <span type="text" @click = "toOut()">退出</span>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import md5 from 'js-md5'
export default {
  name: 'NavarHeader',
  data () {
    return {
      activeName: 'first',
      dialogFormVisible_login: false,
      dialogFormVisible_register: false,
      form_login: {
        name: '',
        password: ''
      },
      form_register: {
        name: '',
        password: ''
      },
      userName: '',
      userPwd: '',
      isShow: true,
      isLogin: false,
      isAdmin: false,
      dialogFormVisible: false,
      form: {name: ''},
      isOut: false
      // formLabelWidth: '0px'
    }
  },
  mounted: function () {
    // console.log(this.getCookie('Mxiaer8_userName'))
    if (this.getCookie('Mxiaer8_userName') !== '' && this.getCookie('Mxiaer8_userPwd') !== '') {
      axios.post('/users/login', {
        userName: this.getCookie('Mxiaer8_userName'),
        userPwd: this.getCookie('Mxiaer8_userPwd')
      }).then((response) => {
        if (response.data.status === '0') {
          this.dialogFormVisible_login = false
          this.isShow = false
          this.userName = response.data.result.userName
          this.isLogin = true
          this.isOut = true
          if (this.userName === 'MXX') {
            this.isAdmin = true
          } else { this.isAdmin = false }
        } else if (response.data.status === '-1') {
          this.dialogFormVisible_login = false
          this.$notify.error({
            title: '错误',
            message: '用户名或密码错误！'
          })
        }
      }).catch(function (error) {
        console.log(error)
      })
    }
  },
  methods: {
    getCookie (name) {
      var strCookie = document.cookie
      var arrCookie = strCookie.split('; ')
      for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split('=')
        if (arr[0] === name) return arr[1]
      }
      return ''
    },
    handleClick (tab, event) {
      // console.log(tab._uid)
      if (tab._uid === 6) {
        this.$router.push({path: '/'})
        // window.location.href = 'http://localhost:8080/#/'
      } else if (tab._uid === 7) {
        this.$router.push({path: '/aboutMe'})
        // window.location.href = 'http://localhost:8080/#/aboutMe'
      }
    },
    login () {
      var password = md5(this.form_login.password) // 加密处理
      this.userName = this.form_login.name
      this.userPwd = password
      axios.post('/users/login', {
        userName: this.userName,
        userPwd: this.userPwd
      }).then((response) => {
        if (response.data.status === '0') {
          this.dialogFormVisible_login = false
          this.isShow = false
          this.userName = response.data.result.userName
          this.isLogin = true
          this.isOut = true
          if (this.userName === 'MXX') {
            this.isAdmin = true
          } else { this.isAdmin = false }
          // 设置cookie
          var exp = new Date()
          exp.setTime(exp.getTime() + 60 * 1000 * 60 * 24) // cookie保存24小时
          document.cookie = 'Mxiaer8_userName=' + this.userName + ';expires=' + exp.toGMTString()
          document.cookie = 'Mxiaer8_userPwd=' + password + ';expires=' + exp.toGMTString()
        } else if (response.data.status === '-1') {
          this.dialogFormVisible_login = false
          this.$notify.error({
            title: '错误',
            message: '用户名或密码错误！'
          })
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    register () {
      var password = md5(this.form_register.password) // 加密处理
      this.userName = this.form_register.name
      this.userPwd = password
      if (this.form_register.name === '' || this.form_register.password === '') {
        this.$notify.error({
          title: '错误',
          message: '用户名和密码不可为空！'
        })
      } else {
        axios.post('/users/register', {
          userName: this.userName,
          userPwd: this.userPwd
        }).then((response) => {
          if (response.data.status === '0') {
            this.dialogFormVisible_register = false
            this.isShow = false
            this.isLogin = true
            this.isOut = true
            this.$notify({
              title: '成功',
              message: '注册成功',
              type: 'success'
            })
            // // 设置cookie
            // var exp = new Date()
            // exp.setTime(exp.getTime() + 60 * 1000 * 60 * 24) // cookie保存24小时
            // document.cookie = 'Mxiaer8_userName=' + this.userName + ';expires=' + exp.toGMTString()
            // document.cookie = 'Mxiaer8_userPwd=' + password + ';expires=' + exp.toGMTString()
          } else if (response.data.status === '-1') {
            this.dialogFormVisible_register = true
            this.$notify.error({
              title: '错误',
              message: '该用户名已被注册过哦！'
            })
          }
        }).catch(function (error) {
          console.log(error)
        })
      }
    },
    toWrite () {
      this.$router.push({path: '/write'})
      // window.location.href = 'http://www.mxiaer8.cn:8080/dist/#/write'
    },
    toOut () {
      document.cookie = 'Mxiaer8_userName='
      document.cookie = 'Mxiaer8_userPwd='
      window.location.reload(true)
    },
    manageBlog () {
      if (this.userName === 'MXX') {
        this.$router.push({path: '/adminManage'})
        // window.location.href = 'http://www.mxiaer8.cn:8080/dist/#/adminManage'
      }
    }
  }
}
</script>

<style scoped>
  .el-tabs{
    background-color: white;
    display: inline-block;
  }
  .menu, .login_register{
    display: inline-block;
  }
  .menu{
    float: left;
  }
  .login_register{
    float: right;
    margin: 6px 0px 0px 0px;
  }
  .el-tabs__header{
    margin: 0px 50px;
  }
  el-button{
    float: right;
  }
  .header{
    padding: 5px 200px 0px 200px;
    background-color: white;
    height: 44px;
    margin: auto;
  }
 .form_login, .form_register{
     width: 100%;
   }
  .login_button, .register_button, .isLogin_text, .isAdmin_text, .isOut_text{
    display: inline-block;
    margin: 0px 10px;
  }
  .isAdmin_text{
    color: #61afff;
    font-size: 14px;
    cursor: pointer;
  }
  .isOut_text{
    color: red;
    font-size: 12px;
    cursor: pointer;
  }
  .isLogin_text{
    cursor: pointer;
  }
</style>
