import { Router } from 'express'
import UserController from '../controllers/UserController'
import AuthMiddleware from '../middlewares/AuthMiddleware'

const userRoutes = Router()

userRoutes.post('/', UserController.create)

userRoutes.get('/me', AuthMiddleware, UserController.profile)
userRoutes.get('/profile', AuthMiddleware, UserController.getUserWithPosts)

export default userRoutes
