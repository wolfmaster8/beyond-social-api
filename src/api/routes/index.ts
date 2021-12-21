import { Router, Request, Response } from 'express'
import userRoutes from './user'
import authRoutes from './authentication'

const router = Router()

router.get('/', (req: Request, res: Response) =>
  res.status(200).json({ message: 'OK' })
)

router.use('/auth', authRoutes)
router.use('/users', userRoutes)

export default router
