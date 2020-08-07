// Dependencies
import express, { Application, Request, Response } from 'express'
import next from 'next'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import session from 'express-session'
import { buildUrl } from 'fogg-utils'

// Middleware
import { isConnected } from './shared/lib/middlewares/user'

// Config
import config from './config'

// Settings up Next App
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

// Running Next App
nextApp.prepare().then(() => {
  const app: Application = express()

  // Public static
  app.use(express.static(path.join(__dirname, '../public')))

  // Middlewares
  app.use(
    session({
      resave: false,
      saveUninitialized: true,
      secret: config.security.secretKey
    })
  )
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(cookieParser(config.security.secretKey))
  app.use(cors({ credentials: true, origin: true }))

  // Routes
  app.get('/login', isConnected(false), (req: Request, res: Response) => {
    return nextApp.render(req, res, '/users/login')
  })

  app.get('/logout', (req: Request, res: Response) => {
    const redirect: any = req.query.redirectTo || '/'
    res.clearCookie('at')
    res.redirect(redirect)
  })

  app.use(
    `/dashboard/:appId?/:stage?/:moduleName?/:section?/:model?`,
    isConnected(true, ['god', 'admin', 'editor'], '/login?redirectTo=/dashboard'),
    (req: any, res: any) => {
      const { appId, stage, moduleName, section, model } = req.params
      const url = buildUrl(['dashboard', appId, stage, moduleName, section, model])

      return nextApp.render(req, res, `/${url}`)
    }
  )

  app.all('*', (req: any, res: any) => {
    return handle(req, res)
  })

  // Listening port
  app.listen(config.server.port)
})
