import { Router } from 'express'
import PostController from '../controllers/PostController'
import AuthMiddleware from '../middlewares/AuthMiddleware'

const postRoutes = Router()

postRoutes.post('/', AuthMiddleware, PostController.create)
postRoutes.get('/user', AuthMiddleware, PostController.getUserPosts)

export default postRoutes
