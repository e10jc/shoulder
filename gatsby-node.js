exports.modifyBabelrc = ({babelrc}) => ({
  ...babelrc,
  plugins: babelrc.plugins.concat(['transform-regenerator', 'transform-runtime']),
})