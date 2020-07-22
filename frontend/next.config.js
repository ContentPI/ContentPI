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
    const dir = __dirname

    config.resolve.alias['@app'] = path.resolve(dir, './src/app')
    config.resolve.alias['@config'] = path.resolve(dir, './src/config')
    config.resolve.alias['@lib'] = path.resolve(dir, './src/shared/lib')
    config.resolve.alias['@pages'] = path.resolve(dir, './src/pages')
    config.resolve.alias['@shared'] = path.resolve(dir, './src/shared')
    config.resolve.alias.styles = path.resolve(dir, './src/shared/styles')

    return config
  }
})
