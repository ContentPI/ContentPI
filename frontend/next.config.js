// Dependencies
const path = require('path')
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin')
const Dotenv = require('dotenv-webpack')

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

const myCustomConfig = {
  reactStrictMode: true,
  devIndicators: {
    autoPrerender: false
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    }

    // Aliases
    const dir = __dirname

    config.resolve.alias['@app'] = path.resolve(dir, './src/app')
    config.resolve.alias['@config'] = path.resolve(dir, './src/config')
    config.resolve.alias['@constants'] = path.resolve(dir, './src/constants')
    config.resolve.alias['@contexts'] = path.resolve(dir, './src/contexts')
    config.resolve.alias['@dashboard'] = path.resolve(dir, './src/app/dashboard')
    config.resolve.alias['@graphql'] = path.resolve(dir, './src/graphql')
    config.resolve.alias['@interfaces'] = path.resolve(dir, './src/interfaces')
    config.resolve.alias['@layouts'] = path.resolve(dir, './src/shared/components/layouts')
    config.resolve.alias['@lib'] = path.resolve(dir, './src/shared/lib')
    config.resolve.alias['@modals'] = path.resolve(dir, './src/app/dashboard/components/Modals')
    config.resolve.alias['@pages'] = path.resolve(dir, './src/pages')
    config.resolve.alias['@shared'] = path.resolve(dir, './src/shared')
    config.resolve.alias['@styles'] = path.resolve(dir, './src/shared/styles')
    config.resolve.alias['@ui'] = path.resolve(dir, './src/shared/components/ui')
    config.resolve.alias.styles = path.resolve(dir, './src/shared/styles')

    // Plugins
    config.plugins.push(
      new FilterWarningsPlugin({
        exclude: /mini-css-extract-plugin[^]*Conflicting order between:/
      }),
      new Dotenv({
        silent: true
      })
    )

    return config
  }
}

module.exports = (phase, { defaultConfig }) => {
  const customConfig = {
    ...defaultConfig,
    ...myCustomConfig
  }

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      ...customConfig,
      webpackDevMiddleware: config => {
        config.watchOptions = {
          poll: 1000,
          aggregateTimeout: 300
        }

        return config
      }
    }
  }

  return customConfig
}
