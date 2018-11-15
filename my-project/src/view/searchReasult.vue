<template>
<div class="content">
  <div class="left_articles">
    <div class = "all_articles" >
      <span class="article_title" @click = "articlesDetail(articlesList._id)">{{articlesList.articlesName}}</span>
      <div class = "article_information">{{articlesList.articlesText}}</div>
      <div class = "article_message">
        <span class = "time">{{articlesList.articlesTime}}</span>
        <span class = "read_number">阅读数: {{articlesList.articlesRead}}</span>
        <span class = "article_point">评论数: {{articlesList.articlesPoint}}</span>
      </div>
    </div>
  </div>
  <div class = "right_author">
    <author></author>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import author from '../components/author'
export default {
  name: 'SearchReasult',
  components: {
    author
  },
  data () {
    return {
      articlesList: ''
    }
  },
  methods: {
    articlesDetail (id) {
      window.location.href = 'http://localhost:8080/#/theArticles?' + 'articlesId=' + id
    }
  },
  mounted: function () {
    var search = decodeURI(window.location.href.split('=')[1])
    axios.post('/articles/findLikesArticles', {
      likes: search
    }).then((response) => {
      // console.log(response.data)
      if (response.data.status === '0') {
      //   console.log(response.data.result.list)
        this.articlesList = response.data.result.list
      //   console.log(JSON.stringify(this.articlesList))
      }
    }).catch(function (error) {
      console.log(error)
    })
  }
}
</script>

<style scoped>
  .all_articles{
    margin: 15px 0px;
    background-color: white;
    height: 150px;
  }
  .article_title{
    display: inline-block;
    margin: 13px 20px 8px 20px;
    font-size: 1.4rem;
    font-weight: 300;
    cursor: pointer;
  }
  .article_information{
    margin: 5px 20px;
    font-size: 1rem;
    font-weight: 200;
    height: 60px;
    overflow: hidden;
  }
  .article_message{
    display: inline-block;
    margin: 5px 20px;
    font-size: .8rem;
    font-weight: 400;
  }
  .left_articles{
    width: 70%;
    float: left;
    padding: 5px 60px 5px 80px;
  }
  .right_author{
    width: 22%;
    float: left;
    padding: 5px 0px;
  }
  .content{
    padding: 5px;
  }
</style>
