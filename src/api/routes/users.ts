import { Router } from 'express'
import UserController from '../controllers/UserController'
import AuthMiddleware from '../middlewares/AuthMiddleware'

const userRoutes = Router()

userRoutes.post('/', UserController.create)

userRoutes.get('/me', AuthMiddleware, UserController.profile)
userRoutes.get(
  '/profile/:username',
  AuthMiddleware,
  UserController.getUserWithPosts
)
userRoutes.patch('/', AuthMiddleware, UserController.update)

export default userRoutes
