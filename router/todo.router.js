import { Router } from 'express'
import todoController from '../controller/todo.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const router = new Router()

router.post('/', authMiddleware, todoController.create)
router.put('/:id',  authMiddleware, todoController.update)
router.delete('/:id', authMiddleware, todoController.delete)
router.get('/', todoController.getAll)
router.get('/:id', authMiddleware, todoController.getByUser)

export default router