// 项目发布阶段需要用到的插件
const proPlugins = []
if (process.env.NOE_ENV === 'production') {
  proPlugins.push('transform-remove-console')
}
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'

  ]
}
