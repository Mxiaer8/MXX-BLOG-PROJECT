<template>
  <div class="content">
    <div class="left_articles">
      <articles></articles>
    </div>
    <div class = "right_author">
      <author></author>
    </div>
  </div>
</template>

<script>
import articles from '../components/articles'
import author from '../components/author'
export default {
  name: 'index',
  components: {
    articles,
    author
  }
}

</script>

<style scoped>
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
