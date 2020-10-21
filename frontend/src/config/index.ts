// Dependencies
import dotenv from 'dotenv'

// Configuration
import common from './common.json'
import local from './local.json'
import production from './production.json'

// Loading .env vars
dotenv.config()

// Interface
interface iConfig {
  baseUrl: string
  api: {
    uri: string
    credentials: string
  }
  debug: boolean
  cache: boolean
  session: {
    cookieDomain: string
    maxAge: number
    cookiePrefix: string
    path: string
    httpOnly: boolean
  }
  files: {
    path: string
    allowedExtensions: string[]
    maxFileSize: number
    types: any
  }
  server: {
    port: number
  }
  languages: {
    default: string
    list: string[]
  }
  security: {
    secretKey: string
    expiresIn: string
  }
}

// Extracting data from .env file
const { SECURITY_SECRET_KEY = '' } = process.env

// Getting Secret Key from .env file
common.security.secretKey = SECURITY_SECRET_KEY

// development => local
let env = 'local'

if (process.env.NODE_ENV && process.env.NODE_ENV !== 'development') {
  env = process.env.NODE_ENV
}

// Configurations by environment
const config: iConfig = {
  ...common,
  ...(env === 'local' ? local : production)
}

// Environments validations
export const isLocal = () => env === 'local'
export const isProduction = () => env === 'production'

// Configuration
export default config
