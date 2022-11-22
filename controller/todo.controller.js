import { ApiError } from '../error/ApiError.js'
import todoService from '../service/todo.service.js'

class TodoController {
  async create(req, res, next) {
    const token = req.headers.authorization.split(' ')[1]
    const response = await todoService.create(req.body, token)
    res.json(response)
    try {
    } catch (e) {
      next(res.json(ApiError.badRequest(e.message)))
    }
  }
  async update(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const response = await todoService.update(req.params, req.body, token)
      res.json(response)
    } catch (e) {
      next(res.json(ApiError.badRequest(e.message)))
    }
  }
  async delete(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const response = await todoService.delete(req.params, token)
      res.json(response)
    } catch (e) {
      next(res.json(ApiError.badRequest(e.message)))
    }
  }
  async getAll(req, res, next) {
    try {
      const response = await todoService.getAll(req.query)
      res.json(response)
    } catch (e) {
      next(res.json(ApiError.badRequest(e.message)))
    }
  }

  async getByUser(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const response = await todoService.getByUser(req.query, token)
      res.json(response)
    } catch (e) {
      next(res.json(ApiError.badRequest(e.message)))
    }
  }
}

export default new TodoController()