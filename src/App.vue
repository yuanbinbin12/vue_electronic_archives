<template>
  <div id="app" onselectstart="return false">
    <router-view></router-view>
  </div>
</template>

<script>
import $ from 'jquery';
export default {
  name: 'App',
  mounted() {
      window.addEventListener('scroll', this.setScroll, true);
  },
  beforeDestroy(){
    window.removeEventListener('scroll', this.setScroll, true);
  },
  methods:{
    setScroll(){
      var top = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset;
      var left = document.body.scrollLeft || document.documentElement.scrollLeft ||window.pageXOffset;
      $(".Masking-layer").css({
        top,left
      });
      $(".confirm-window").css({
        top,left
      });
    }
  }
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  /* user-select: none; */
}
.el-row,.el-col{
  background-color: #f9fafc !important;
}
.el-row{
    margin-bottom: 6px !important;
    padding-top: 6px !important;
    padding-right: 4px !important;
}
.el-row .el-col:not(:first-child){
  padding-left: 8px !important;
}
</style>
