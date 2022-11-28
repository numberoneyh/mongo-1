import userService from '../service/user.service.js'

class UserController {
  async register(req, res) {
    try {
      const response = await userService.register(req)
      res.json(response)
    } catch (e) {
      res.status(400).json(e)
    }
  }
  async login(req, res) {
    try {
      const response = await userService.login(req.body)
      res.json(response)
    } catch (e) {
      res.status(400).json(e)
    }
  }
  async authCheck(req, res) {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const response = await userService.authCheck(token)
      return res.json(response)
    } catch (e) {
      res.status(400).json(e)
    }
  }
}

export default new UserController()