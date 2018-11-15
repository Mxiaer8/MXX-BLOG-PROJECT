<template>
  <div id="app">
    <navarheader></navarheader>
    <router-view></router-view>
  </div>

</template>

<!--<script src="//cdn.quilljs.com/1.2.2/quill.min.js"></script>-->
<!--<script src="../static/js/image-resize.min.js"></script>-->
<!--<script src="./script.js"></script>-->
<script>
import navarheader from './components/NavarHeader'
import articles from './components/articles'
import author from './components/author'

export default {
  name: 'App',
  components: {
    navarheader,
    articles,
    author
  }
}
</script>

<style>

/*#app {*/
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
*{
  margin: 0px;
  box-sizing: border-box;
}
body{
  background-color: #fdc3d9;
  min-width: 1200px;
}
</style>
