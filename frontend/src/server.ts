// Dependencies
import express from 'express'
import next from 'next'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import session from 'express-session'

// Config
import config from './config'

// Settings up Next App
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

// Running Next App
nextApp.prepare().then(() => {
  const app = express()

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
  app.get('/login', (req: any, res: any) => {
    return nextApp.render(req, res, '/users/login', req.query)
  })

  app.use('/dashboard', (req: any, res: any) => nextApp.render(req, res, '/dashboard', req.query))

  app.all('*', (req: any, res: any) => {
    return handle(req, res)
  })

  // Listening port
  app.listen(config.server.port)
})
