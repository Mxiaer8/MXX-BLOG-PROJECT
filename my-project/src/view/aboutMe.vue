<template>
 <div class="content">
   <div class="my_information">
     <article class="all_articles">
       <p>关于我嘞，小可爱一枚，嘻嘻嘻，一直想做个个人博客，以前觉得好难哦，很羡慕那些自己写了个个人博客的人，
       现在觉得还好啊，原来我也能做到，风格虽然可能没有特别的好看，但也是极尽我的能力设计得好看的，想着不断再
       继续完善，先做着基本功能嘞。然后即将要去找实习啦，有点小紧张，但觉得如果自己学习得足够好，就有足够的信
       心啦，期待自己不断进步，嘻嘻嘻(*^▽^*)</p>
     </article>
     <article class="all_articles contacts">
       <p>联系方式：</p>
       <p>邮箱： 905594203@qq.com</p>
     </article>
   </div>
   <div class = "right_author">
     <author></author>
   </div>
 </div>
</template>

<script>
import author from '../components/author'
export default {
  name: 'about',
  components: {
    author
  }
}
</script>

<style scoped>
  .my_information{
    width: 70%;
    float: left;
    padding: 5px 60px 5px 80px;
    font-family: "Microsoft Sans Serif";
    letter-spacing: 1px;
  }
  .right_author{
    width: 22%;
    float: left;
    padding: 5px 0px;
  }
  .all_articles{
    margin: 15px 0px;
    padding: 20px 30px;
    background-color: white;
    height: 150px;
  }
  .contacts p{
    margin: 5px 0px;
  }
  .content{
    padding: 5px;
  }
</style>
