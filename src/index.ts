import express, { Application } from 'express'
import routes from './api/routes'
import dbInit from './db/init'

require('dotenv').config({ path: '.env' })

dbInit()

const app: Application = express()
const port = 3000

// Body parsing Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Main Routes
app.use('/api/v1', routes)

try {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
  })
} catch (error: any) {
  console.log(`Error occurred: ${error.message}`)
}
