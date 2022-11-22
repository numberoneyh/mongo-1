import jwt from 'jsonwebtoken'
import Todo from '../models/Todo.js'

class TodoService {
  async create(data, token) {
    const { id } = jwt.verify(token, process.env.SECRET_KEY)
    const { title, complete } = data
    const todo = await new Todo({ title, complete: complete ? complete : false, author: id })
    await todo.save()

    return { message: 'задача успешно добавлен' }
  }

  async update(params, data, token) {
    const { id } = params
    const { title, complete } = data
    const { author } = await Todo.findById(id).exec()
    const { id: userId } = jwt.verify(token, process.env.SECRET_KEY)

    if (userId === author.toString()) {
      await Todo.updateOne({ id }, { title, complete })
    }

    if (userId !== author.toString()) {
      return { message: 'вы не являетесь владельцем задачи' }
    }

    return { message: 'задача успешно обновлена' }
  }

  async delete(params, token) {
    const { id } = params
    const { author } = await Todo.findById(id).exec()
    const { id: userId } = jwt.verify(token, process.env.SECRET_KEY)

    if (!author) {
      return { message: 'задача не найдена' }
    }

    if (userId === author.toString()) {
      await Todo.findByIdAndDelete(id)
    }

    if (userId !== author.toString()) {
      return { message: 'вы не являетесь владельцем задачи' }
    }

    return { message: 'задача успешно удалена' }
  }

  async getAll(data) {
    let { page, limit } = data

    if (page && limit) {
      page = page || 1
      limit = limit || 6
      return await Todo.paginate({}, { page, limit })
    }

    if (!page && limit) {
      page = page || 1
      limit = limit || 6
      return await Todo.paginate({}, { page, limit })
    }

    if (page && !limit) {
      page = page || 1
      limit = limit || 6
      return await Todo.paginate({}, { page, limit })
    }

    const todo = Todo.find()
    return todo
  }

  async getByUser(data, token) {
    const { id } = jwt.verify(token, process.env.SECRET_KEY)
    let { page, limit } = data

    if (page && limit) {
      page = page || 1
      limit = limit || 6
      return await Todo.paginate({author: id}, { page, limit })
    }

    if (!page && limit) {
      page = page || 1
      limit = limit || 6
      return await Todo.paginate({author: id}, { page, limit })
    }

    if (page && !limit) {
      page = page || 1
      limit = limit || 6
      return await Todo.paginate({author: id}, { page, limit })
    }

    const todo = Todo.find({author: id})
    return todo
  }
}

export default new TodoService()