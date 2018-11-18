<template>
<div class="content">
  <article class="left_articles theArticles">
    <h2>{{this.title}}</h2>
    <span class="time">{{this.time}}</span>
    <div class="text">{{this.text}}</div>
    <div class = "other_information">
      <span class="hasRead">阅读数：{{this.read}} </span>
      <span class="hasPoint">评论数：{{this.point}}</span>
    </div>
  </article>
  <div class = "right_author">
    <author></author>
  </div>
</div>
</template>

<script>
import author from '../components/author'
import axios from 'axios'
export default {
  name: 'theArticles',
  components: {
    author
  },
  data () {
    return {
      article_Id: this.$router.history.current.query.articlesId,
      articles_Read: '',
      title: '',
      time: '',
      text: '',
      read: '',
      point: ''
    }
  },
  mounted: function () {
    // console.log(this.article_Id)
    axios.post('http://www.mxiaer8.cn:3000/articles/findOneArticle', {
      articles_Id: this.article_Id
    }).then((response) => {
      // console.log(response.data)
      if (response.data.status === '0') {
        var queryResult = response.data.result.list
        this.title = queryResult.articlesName
        this.time = queryResult.articlesTime
        this.text = document.querySelector('.text').innerHTML = queryResult.articlesText
        this.read = queryResult.articlesRead + 1
        this.point = queryResult.articlesPoint
      }
      axios.post('http://www.mxiaer8.cn:3000/articles/hasRead', {
        articles_Id: this.article_Id,
        articles_Read: this.read
      }).then((response) => {
      }).catch(function (error) {
        console.log(error)
      })
    }).catch(function (error) {
      console.log(error)
    })
    // console.log(this.read + 'ewewe' + this.read + 1)
    // axios.post('/articles/hasRead', {
    //   articles_Id: this.article_Id,
    //   articles_Read: this.read + 1
    // }).then((response) => {
    // }).catch(function (error) {
    //   console.log(error)
    // })
  }
}
</script>

<style scoped>
  .theArticles{
  margin: 20px 25px;
  background-color: white;
  }
  .content{
    padding: 5px;
  }
  .left_articles{
    width: 70%;
    float: left;
    padding: 20px 10px 20px 10px;
  }
  .right_author{
    width: 22%;
    float: left;
    padding: 5px 0px;
  }

  article h2{
    margin: 10px;
    text-align: center;
    font-weight: normal;
  }
  article .time{
    margin: 20px;
    display: block;
    text-align: center;
    font-weight: lighter;
  }
  article .text{
    margin: 10px 20px
  }
  article .other_information{
    float: right;
    margin: 10px 20px;
    font-weight: lighter;
  }
  article .other_information span{
    margin: 0px 5px;
  }
</style>
