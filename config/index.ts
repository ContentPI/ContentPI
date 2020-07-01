// Configuration
import config from './config.json'

// Interfaces
interface iDb {
  dialect: string
  host: string
  port: number
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

// Configuration
const { db, security, server } = config

export const $db: iDb = db
export const $security: iSecurity = security
export const $server: iServer = server
