import { ApiError } from '../error/ApiError.js'
import userService from '../service/user.service.js'

class UserController {
  async register(req, res, next) {
    try {
      const response = await userService.register(req)
      res.json(response)
    } catch (e) {
      next(res.json(ApiError.badRequest(e.message)))
    }
  }
  async login(req, res, next) {
    try {
      const response = await userService.login(req.body)
      res.json(response)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
  async authCheck(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const response = await userService.authCheck(token)
      return res.json(response)
    } catch (e) {
      next(res.json(ApiError.badRequest(e.message)))
    }
  }
}

export default new UserController()