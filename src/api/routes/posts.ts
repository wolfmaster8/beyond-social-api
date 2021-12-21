import { Router } from 'express'
import PostController from '../controllers/PostController'
import AuthMiddleware from '../middlewares/AuthMiddleware'

const postRoutes = Router()

postRoutes.post('/', AuthMiddleware, PostController.create)

export default postRoutes
