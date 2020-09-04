const { resolve } = require('path')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const glob = require('glob')
const PurgeCSSPlugin = require('purgecss-webpack-plugin')
const webpack = require('webpack')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { PROJECT_PATH, shouldOpenAnalyzer } = require('../constant')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'production',
  devtool: 'none',
  plugins: [
    new CleanWebpackPlugin(),
    new PurgeCSSPlugin({
      paths: glob.sync(`${resolve(PROJECT_PATH, './src')}/**/*.{tsx,scss,less,css}`, { nodir: true }),
      whitelist: ['html', 'body'],
    }),
    new webpack.BannerPlugin({
      raw: true,
      banner: '/** @preserve 哈哈哈哈哈 😄 */',
    }),
    shouldOpenAnalyzer &&
      new BundleAnalyzerPlugin({
        analyzerMode: 'server', // 开一个本地服务查看报告
        analyzerHost: '127.0.0.1', // host 设置
        analyzerPort: 8888, // 端口号设置
      }),
  ].filter(Boolean),
})
