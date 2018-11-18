<template>
<div>
  <div class="content">
    <div class="title">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="文章题目" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
    </el-form>
  </div>
    <div class="left_articles">
      <quill-editor v-model="content"
                    ref="myQuillEditor"
                    :options="editorOption"
                    @blur="onEditorBlur($event)"
                    @focus="onEditorFocus($event)"
                    @ready="onEditorReady($event)">
      </quill-editor>
      <div class="submit"><el-button type="primary" @click = "commit()">提交</el-button></div>
    </div>
    <div class = "right_author">
      <author></author>
    </div>
  </div>
</div>
</template>

<script>
import author from '../components/author'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import axios from 'axios'

export default {
  name: 'write',
  components: {
    author
  },
  data () {
    return {
      content: '',
      time: '',
      ruleForm: {
        name: ''
      },
      editorOption: {
        // modules: {
        //   imageResize: {}
        // },
        theme: 'snow'
      },
      rules: {
        name: [
          {required: true, message: '请输入文章题目', trigger: 'blur'},
          {min: 0, max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    onEditorBlur (quill) {
      // console.log('editor blur!', quill)
    },
    onEditorFocus (quill) {
      // console.log('editor focus!', quill)
    },
    onEditorReady (quill) {
      //  console.log('editor ready!', quill)
    },
    commit () {
      // console.log(this.content)
      var date = new Date()
      var year = date.getFullYear()
      var months = date.getMonth() + 1
      var days = date.getDate()
      this.time = year + '/' + months + '/' + days
      // console.log(this.time)
      if (this.ruleForm.name === '') {
        this.$notify({
          title: '警告',
          message: '请输入文章题目哦！',
          type: 'warning'
        })
      } else {
        axios.post('http://www.mxiaer8.cn:3000/articles/editArticle', {
          articlesText: this.content,
          articlesName: this.ruleForm.name,
          articlesTime: this.time,
          articlesRead: '',
          articlesPoint: ''
        }).then((response) => {
          // console.log(response.data)
          if (response.data.status === '0') {
            this.$notify({
              title: '成功',
              message: '发布成功',
              type: 'success'
            })
            this.$router.push({path: '/'})
          }
        }).catch(function (error) {
          console.log(error)
        })
      }
    }
  },
  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  }
}

</script>

<style scoped>
  .title{
    width: 30%;
    float: left;
    margin: 20px 60px -25px 60px;
  }
  .left_articles{
    background-color: white;
    width: 60%;
    float: left;
    margin: 20px 60px 40px 80px;
  }
  .right_author{
    width: 22%;
    float: left;
    padding: 5px 0px;
  }
  .content{
    padding: 5px;
  }
  .ql-container{
    height: 500px;
  }
  .submit{
    float: right;
  }
</style>
