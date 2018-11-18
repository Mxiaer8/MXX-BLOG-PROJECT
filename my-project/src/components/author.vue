<template>
  <div class="author_information" >
    <div class="author_introduce">
      <span class="person_image">
        <img src = 'static/image/person_image.jpg'>
        <span>MXX</span>
      </span>
      <p class = "person_introduce">啦啦啦，你好，小可爱</p>
    </div>
    <div class="recent_articles">
      <span>最近文章</span>
      <ul v-for="(item, index) in articlesList" :key="item.id">
        <li @click = "articlesDetail(item._id, index)">{{item.articlesName}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'author',
  data () {
    return {
      articlesList: []
    }
  },
  mounted: function () {
    axios.get('http://www.mxiaer8.cn:3000/articles').then((response) => {
      if (response.data.status === '0') {
        this.articlesList = response.data.result.recentList
        this.articlesList.reverse()
      }
    })
  },
  methods: {
    articlesDetail (id, index) {
      window.location.href = 'http://localhost:8080/#/theArticles?' + 'articlesId=' + id + '&articlesIndex=' + index
      window.location.reload(true)
    }
  }
}
</script>

<style scoped>
.author_information{
  margin: 15px 0px;
}
  .person_image{
    display: inline-block;
    width: 100%;
    height: 200px;
    text-align: center;
    background-color: white;
  }
  .person_image span{
    display: inline-block;
    width: 100%;
    height: 15%;
  }
 img{
    width: 70%;
    height: 85%;
  }
  .person_introduce{
    display: inline-block;
    width: 100%;
    background-color: white;
    margin: 5px 0px;
    font-size: 0.9rem;
    font-weight: 300;
    text-align: center;
  }
  .recent_articles{
    width: 100%;
    margin: 5px 0px;
    padding: 5px 0px;
    background-color: white;
  }
  .recent_articles span{
    display: inline-block;
    margin: 15px 10px 5px 10px;
  }
  .recent_articles ul{
    font-size: 0.9rem;
    font-weight: 300;
    list-style: none;
    padding-left: 0px;
    margin: 5px 10px;
  }
.recent_articles ul li{
  margin: 7px 0px;
  cursor: pointer;
}
  a{
    text-decoration: none;
  }

</style>
