<template>
<div class="theArticleList">
  <span id="listTitle">文章列表</span>
  <span class="title article_title">博客</span>
  <span class="title time">日期</span>
  <span class="title operation">操作</span>
  <div v-for="(item,index) in articlesList" :key="item.id">
    <div class = "all_articles" >
      <span class="article_title" @click = "articlesDetail(item._id)">{{item.articlesName}}</span>
      <span class = "time">{{item.articlesTime}}</span>
      <span class="operation toDelete" @click = "deleteArticle(item._id,index)">删除</span>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'adminManage',
  components: {
  },
  data () {
    return {
      articlesList: [],
      articlesId: ''
    }
  },
  mounted: function () {
    axios.get('/articles').then((response) => {
      if (response.data.status === '0') {
        this.articlesList = response.data.result.list
        this.articlesList.reverse()
      }
    }).catch(function (error) {
      console.log(error)
    })
  },
  methods: {
    articlesDetail (id) {
      window.location.href = 'http://localhost:8080/#/theArticles?' + 'articlesId=' + id
    },
    deleteArticle (id, index) {
      axios.post('/articles/deleteArticle', {
        articlesId: id
      }).then((response) => {
        // console.log(response.data.status)
        if (response.data.status === '0') {
          // alert('1')
          this.articlesList.splice(index, 1)
        }
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
  .theArticleList{
    background-color: white;
    margin: 10px 200px;
    padding: 20px 50px;
  }
  .all_articles{
    margin: 8px 0px;
  }
  .title{
    display: inline-block;
  }
  #listTitle{
    display: block;
    margin: 10px 0px 20px 0px;
  }
  .article_title, .time, .operation{
    margin: 0px 40px;
    width: 200px;
    display: inline-block;
  }
  .article_title{
    cursor: pointer;
  }
  .toDelete{
    color: red;
    cursor: pointer;
  }
</style>
