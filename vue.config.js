module.exports = {
  outputDir: 'dist',
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  devServer: {
    proxy: {
      '/upload-file-service': {
        // target: 'http://180.167.180.242:7866/mock/1886',
        target: 'http://180.167.180.242:42074',
        changeOrigin: true, // needed for virtual hosted sites
        ws: true, // proxy websockets
      },
      '/demo': {
        target: 'http://localhost:3000',
        changeOrigin: true, // needed for virtual hosted sites
        ws: true, // proxy websockets
      }
    }
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            hack: 'true; @import "./src/style/var.less";'
          }
        }
      }
    }
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: []
    }
  }
}
