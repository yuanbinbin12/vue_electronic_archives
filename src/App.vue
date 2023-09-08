<template>
  <div id="app" onselectstart="return false">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods:{
    setScale () {
      let ratio = 0
      const screen = window.screen
      const ua = navigator.userAgent.toLowerCase()
      if (window.devicePixelRatio !== undefined) {
        ratio = window.devicePixelRatio
      } else if (~ua.indexOf('msie')) {
        if (screen.deviceXDPI && screen.logicalXDPI) {
          ratio = screen.deviceXDPI / screen.logicalXDPI
        }
      } else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
        ratio = window.outerWidth / window.innerWidth
      }
      if (ratio) {
        ratio = Math.round(ratio * 100)
        if (~ua.indexOf('firefox')) {
          document.body.style.MozTransform = 'scale(' + ((100 / ratio) * 100) / 100 + ')'
          document.body.style.MozTransformOrigin = '0 0'
          document.body.style.right = (100 - ratio) + '%'
          document.body.style.bottom = (100 - ratio) + '%'
        } else {
          document.body.style.zoom = Math.floor((100 / ratio) * 100) / 100
        }
      }
    }
  },
  mounted(){
    let that = this
    window.addEventListener('resize', function () {
      that.setScale()
    })
  },
  created: function () {
    this.setScale()
  },
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
</style>
