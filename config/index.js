module.exports = {
  dev: {
    proxyTable: {
      // //      proxy all requests starting with / api to api.php
      '/auth': {
        // target: 'http://localhost:8081/api.php?action=read',
        target: 'http://localhost:4000/',
        // target: 'http://localhost:8081/api.php',
        changeOrigin: true,
        pathRewrite: {
            '^/auth': ''
          }
      }
      // '/api': {
      // target: 'http://127.0.0.1:8080/',
      // target: 'http://localhost:8080/api.php?action=read',
      // target: 'http://localhost:8080/',
      // changeOrigin: true
      // pathRewrite: {
      //   '^/api': '/'
      // }
      // }
    }
  }
}