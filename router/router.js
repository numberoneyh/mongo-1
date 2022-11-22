import { Router } from 'express'
import userRouter from './user.router.js'
import todoRouter from './todo.router.js'
const router = new Router()

router.use('/user', userRouter)
router.use('/todos', todoRouter)

export default router