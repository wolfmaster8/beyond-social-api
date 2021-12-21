import { Router, Request, Response } from 'express'
import userRoutes from './users'
import authRoutes from './authentication'
import postRoutes from './posts'

const router = Router()

router.get('/', (req: Request, res: Response) =>
  res.status(200).json({ message: 'OK' })
)

router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/posts', postRoutes)

export default router
