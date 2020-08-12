// Dependencies
import dotenv from 'dotenv'

// Configuration
import config from './config.json'

// Loading .env vars
dotenv.config()

// Interfaces
interface iDb {
  dialect: string
  host: string
  port: string
  database: string
  username: string
  password: string
}

interface iSecurity {
  secretKey: string
  expiresIn: string
}

interface iServer {
  port: number
}

// Extracting data from .env file
const {
  DB_DIALECT = '',
  DB_PORT = '',
  DB_HOST = '',
  DB_DATABASE = '',
  DB_USERNAME = '',
  DB_PASSWORD = '',
  SECURITY_SECRET_KEY = ''
} = process.env

const db: iDb = {
  dialect: DB_DIALECT,
  port: DB_PORT,
  host: DB_HOST,
  database: DB_DATABASE,
  username: DB_USERNAME,
  password: DB_PASSWORD
}

// Configuration
const { security, server } = config

// Getting Secret Key from .env file
security.secretKey = SECURITY_SECRET_KEY

export const $db: iDb = db
export const $security: iSecurity = security
export const $server: iServer = server
