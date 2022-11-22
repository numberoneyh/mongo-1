import { Router } from 'express'
import userController from '../controller/user.controller.js'
import { userValidator } from '../validations/user.validator.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const router = new Router()

router.post('/signup', userValidator, userController.register)
router.post('/login', userController.login)
router.get('/', authMiddleware, userController.authCheck)

export default router