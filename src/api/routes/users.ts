import { Router } from 'express'
import UserController from '../controllers/UserController'
import AuthMiddleware from '../middlewares/AuthMiddleware'

const userRoutes = Router()

userRoutes.post('/', UserController.create)

userRoutes.get('/profile', AuthMiddleware, UserController.profile)

export default userRoutes
