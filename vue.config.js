const { defineConfig } = require('@vue/cli-service')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/charles-json-logic-editor/'
    : '/',
  chainWebpack: (config) => {
    config.plugin('monaco-editor').use(MonacoWebpackPlugin, [])
  }
})
