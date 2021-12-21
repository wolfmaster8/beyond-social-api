import { Router } from 'express'
import PostController from '../controllers/PostController'
import AuthMiddleware from '../middlewares/AuthMiddleware'

const postRoutes = Router()

postRoutes.post('/', AuthMiddleware, PostController.create)
postRoutes.post('/:id/comment', AuthMiddleware, PostController.addCommentToPost)
postRoutes.post('/:id/like', AuthMiddleware, PostController.addLikeToPost)

postRoutes.get('/:id', AuthMiddleware, PostController.findOne)
postRoutes.get('/user', AuthMiddleware, PostController.getUserPosts)

export default postRoutes
