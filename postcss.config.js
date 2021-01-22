module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      // options
      viewportWidth: 720, // UI设计稿的宽度
      unitPrecision: 5, // 保留几位小数，指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
      unitToConvert: 'px', // 需要转换的单位，默认为"px"
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: [], // 指定不需要转换的类
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位.
      // fontViewportUnit: 'vw', // 字体使用的视口单位
      mediaQuery: false, // 允许在媒体查询中转换`px`
      // exclude: [/node_modules/]
    },
    autoprefixer: {}
  }
}
