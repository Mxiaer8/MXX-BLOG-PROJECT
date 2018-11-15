<template>
  <div>
    <div v-for="(item, index) in articlesList" :key="item.id">
      <div class = "all_articles" >
        <span class="article_title" @click = "articlesDetail(item._id, index)">{{item.articlesName}}</span>
        <div class = "article_information">{{item.articlesText}}</div>
        <div class = "article_message">
          <span class = "time">{{item.articlesTime}}</span>
          <span class = "read_number">阅读数: {{item.articlesRead}}</span>
          <span class = "article_point">评论数: {{item.articlesPoint}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'articles',
  data () {
    return {
      articlesList: []
    }
  },
  mounted: function () {
    axios.get('/articles').then((response) => {
      if (response.data.status === '0') {
        this.articlesList = response.data.result.list
        this.articlesList.reverse()
        // console.log(JSON.stringify(this.articlesList))
        for (var i = 0; i < this.articlesList.length; i++) {
          this.articlesList[i].articlesText = this.repalceHtml(this.articlesList[i].articlesText)
        }
      }
    })
  },
  methods: {
    repalceHtml (str) {
      var dd = str.replace(/<\/?.+?>/g, '')
      var dds = dd.replace(/ /g, '')// dds为得到后的内容
      return dds
    },
    articlesDetail (id, index) {
      window.location.href = 'http://localhost:8080/#/theArticles?' + 'articlesId=' + id + '&articlesIndex=' + index
    }
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

</style>
