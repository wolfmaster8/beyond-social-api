import { Router } from 'express'
import UserController from '../controllers/UserController'
import AuthMiddleware from '../middlewares/AuthMiddleware'

const userRoutes = Router()

userRoutes.post('/', UserController.create)

userRoutes.get('/test', AuthMiddleware, UserController.test)

export default userRoutes
