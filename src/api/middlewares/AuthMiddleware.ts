import { Request, Response, Router } from 'express'
import jwt from 'jsonwebtoken'

const AuthMiddleware = Router()

AuthMiddleware.use((req: Request, res: Response, next) => {
  const bearerToken = req.headers.authorization
  const token = bearerToken?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'No token' })
  jwt.verify(token, process.env.APP_SECRET_KEY ?? '', (error, payload) => {
    if (error) return res.status(401).json({ message: 'Invalid' })
    req.body.userId = payload?.userId
    next()
  })
})

export default AuthMiddleware
