import { Router } from 'express'
import userController from '../controller/user.controller.js'
import {
  hValidErrors,
  loginValidation,
  registerValidation,
} from '../validations/user.validator.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { signupError } from '../error/signup.error.js'
import { signinError } from '../error/signin.error.js'

const router = new Router()

router.post(
  '/signup',
  registerValidation,
  hValidErrors,
  signupError,
  userController.register
)
router.post(
  '/signin',
  loginValidation,
  hValidErrors,
  signinError,
  userController.login
)
router.get('/', authMiddleware, userController.authCheck)

export default router