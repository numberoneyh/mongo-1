import User from '../models/User.js'
import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator'
import { generateToken } from '../utils/gToken.js'
import fileService from './file.service.js'

export class UserService {
  async register(data) {
    const fileName = fileService.save(data.files)
    const { email, password, fullName } = data.body
    const errors = validationResult(data)
    const candidate = await User.findOne({ email: email })
    if (!errors.isEmpty()) {
      return errors.array()
    }
    if (candidate) {
      return { message: 'Пользователь с таким адресом электронной почты уже существует' }
    }

    const salt = await bcrypt.genSalt(5)
    const passwordHash = await bcrypt.hash(password, salt)
    const user = new User({ email, password: passwordHash, fullName, avatar: fileName ? fileName : 'avatar.jpg' })
    await user.save()

    return { message: 'Пользователь был успешно зарегистрирован' }
  }

  async login(data) {
    const { email, password } = data
    const user = await User.findOne({ email: email })
    const validPassword = await bcrypt.compare(password, user.password)

    if (!user) {
      return {message: 'Пользователь не найден'}
    }
    if (!validPassword) {
      return {message: 'Пользователь не найден'}
    }

    const token = generateToken(user._id, user.email, user.password, user.fullName, user.avatar)
    return { token }
  }

  async authCheck(data) {
    const token = generateToken(data)
    return {token}
  }
}

export default new UserService()