import express, { Application } from 'express'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import routes from './api/routes'
import dbInit from './db/init'

require('dotenv').config({ path: '.env' })

dbInit()

const app: Application = express()
app.disable('x-powered-by')
const port = 3333

const corsOptions = {
  origin: ['http://localhost:3000'],
}

// Body parsing Middleware
app.use(fileUpload({ createParentPath: true }))
app.use(express.static('uploads'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors(corsOptions))

// Main Routes
app.use('/api/v1', routes)

try {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
  })
} catch (error: any) {
  console.log(`Error occurred: ${error.message}`)
}
