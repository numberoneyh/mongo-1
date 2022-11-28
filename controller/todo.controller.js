import todoService from '../service/todo.service.js'

class TodoController {
  async create(req, res) {
    const token = req.headers.authorization.split(' ')[1]
    const response = await todoService.create(req.body, token)
    res.json(response)
    try {
    } catch (e) {
      res.json(e)
    }
  }
  async update(req, res) {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const response = await todoService.update(req.params, req.body, token)
      res.json(response)
    } catch (e) {
      res.json(e)
    }
  }
  async delete(req, res) {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const response = await todoService.delete(req.params, token)
      res.json(response)
    } catch (e) {
      res.json(e)
    }
  }
  async getAll(req, res) {
    try {
      const response = await todoService.getAll(req.query)
      res.json(response)
    } catch (e) {
      res.json(e)
    }
  }

  async getByUser(req, res) {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const response = await todoService.getByUser(req.query, token)
      res.json(response)
    } catch (e) {
      res.json(e)
    }
  }
}

export default new TodoController()
