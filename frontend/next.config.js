// Dependencies
import withSass from '@zeit/next-sass'

export default withSass({
  cssModules: true,
  cssLoaderOptions: {
    localIdentName: '[name]__[local]__[hash:base64:5]'
  }
})
