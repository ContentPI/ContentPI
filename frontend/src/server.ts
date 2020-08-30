// Dependencies
import express, { Application, Request, Response } from 'express'
import next from 'next'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import session from 'express-session'
import multer from 'multer'
import { buildUrl, getFileInfo } from 'fogg-utils'

// Middleware
import { isConnected } from './shared/lib/middlewares/user'

// Config
import config from './config'

// Settings up Next App
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

// File storage
const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any): any => {
    const { extension } = getFileInfo(file.originalname)
    let dir = 'public/files'

    const isDocument = config.files.types.documents.includes(extension)
    const isImage = config.files.types.images.includes(extension)
    const isVideo = config.files.types.videos.includes(extension)

    if (isDocument) {
      dir += '/documents'
    }

    if (isImage) {
      dir += '/images'
    }

    if (isVideo) {
      dir += '/videos'
    }

    return cb(null, dir)
  },
  filename: (req: any, file: any, cb: any): any => cb(null, req.params.fileName)
})

// Upload
const upload = multer({ storage }).single('file')

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
  app.post('/upload/:fileName', (req: any, res: any) => {
    upload(req, res, (err: any) => {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
      }

      if (err) {
        return res.status(500).json(err)
      }

      return res.status(200).send(req.file)
    })
  })

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
    (req: Request, res: Response) => {
      const { appId, stage, moduleName, section, model } = req.params
      const entryId = req.query.entryId ? String(req.query.entryId) : ''
      const url = buildUrl(['dashboard', appId, stage, moduleName, section, model])

      return nextApp.render(req, res, `/${url}`, { entryId })
    }
  )

  app.all('*', (req: Request, res: Response) => {
    return handle(req, res)
  })

  // Listening port
  app.listen(config.server.port)
})
