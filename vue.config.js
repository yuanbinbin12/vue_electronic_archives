const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: './',
  transpileDependencies: true,
  lintOnSave:false,
  
  devServer:{
    proxy:{
      '/OSPApplication':{
        target:'http://localhost:8080',
        ws: true, //websocket服务端和通信端的通信方式  用于支持websocket
        changeOrigin: true, //跨域伪造  端口号说慌
      //   pathRewrite: {
      //     '^/OSPApplication': '/0SPFileApplication'
      // }
      }
    }
  }
})
