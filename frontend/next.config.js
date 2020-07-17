// Dependencies
import withSass from '@zeit/next-sass'
import path from 'path'

export default withSass({
  cssModules: true,
  cssLoaderOptions: {
    localIdentName: '[name]__[local]__[hash:base64:5]'
  },
  devIndicators: {
    autoPrerender: false
  },
  webpack: config => {
    config.resolve.alias['@app'] = path.resolve(__dirname, './src/app')
    config.resolve.alias['@pages'] = path.resolve(__dirname, './src/pages')
    config.resolve.alias['@shared'] = path.resolve(__dirname, './src/shared')
    config.resolve.alias.styles = path.resolve(__dirname, './src/shared/styles')

    return config
  }
})
