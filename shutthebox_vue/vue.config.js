/*
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
*/

const { DefinePlugin } = require('webpack')

module.exports = {
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === "development" ? "/vuejs-pwa/" : "",
  pwa: {
    name: 'Shut the Box',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    manifestOptions: {
      start_url: '.',
      display: 'standalone',
      background_color: '#ffffff'
      // Add any other manifest options as needed
    },
    workboxPluginMode: 'GenerateSW'
  },
  configureWebpack: {
    plugins: [
      new DefinePlugin({
        'process.env': {
          BASE_URL: JSON.stringify(process.env.BASE_URL || '/')
        }
      })
    ]
  }
}