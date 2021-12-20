import { Router, Request, Response } from 'express'
import userRoutes from './user'

const router = Router()

router.get('/', (req: Request, res: Response) =>
  res.status(200).json({ message: 'OK' })
)

router.use('/users', userRoutes)

export default router
