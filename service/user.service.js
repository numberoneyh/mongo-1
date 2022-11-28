import User from '../models/User.js'
import bcrypt from 'bcrypt'
import { generateToken } from '../utils/gToken.js'
import fileService from './file.service.js'

export class UserService {
  async register(data) {
    const fileName = fileService.save(data.files)
    const { email, password, fullName } = data.body
    const salt = await bcrypt.genSalt(5)
    const passwordHash = await bcrypt.hash(password, salt)
    const user = new User({
      email,
      password: passwordHash,
      fullName,
      avatar: fileName ? fileName : 'avatar.jpg',
    })
    await user.save()

    return { message: 'Пользователь был успешно зарегистрирован' }
  }

  async login(data) {
    const { email } = data
    const user = await User.findOne({ email: email })

    const token = generateToken(
      user._id,
      user.email,
      user.password,
      user.fullName,
      user.avatar
    )
    return { token }
  }

  async authCheck(data) {
    const token = generateToken(data)
    return { token }
  }
}

export default new UserService()