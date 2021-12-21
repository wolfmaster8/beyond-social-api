import { Router } from 'express'
import PostController from '../controllers/PostController'
import AuthMiddleware from '../middlewares/AuthMiddleware'

const postRoutes = Router()

postRoutes.post('/', AuthMiddleware, PostController.create)
postRoutes.post('/comment', AuthMiddleware, PostController.addCommentToPost)
postRoutes.post('/like', AuthMiddleware, PostController.addLikeToPost)
postRoutes.get('/user', AuthMiddleware, PostController.getUserPosts)

export default postRoutes
