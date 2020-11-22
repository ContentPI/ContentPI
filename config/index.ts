// Configuration
import config from './config.json'

// Interaces
interface IDb {
    dialect: string
    host: string
    port: number
    database: string
    username: string
    password: string
}

interface ISecurity {
    secretKey: string
    expiresIn: string
}

interface IServer {
    port: number
}

// Configuration
const { db, security, server } = config

export const $db: IDb = db
export const $security: ISecurity = security
export const $server: IServer = server