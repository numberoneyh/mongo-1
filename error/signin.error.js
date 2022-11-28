import User from '../models/User.js'
import bcrypt from 'bcrypt'

export const signinError = async (req, res, next) => {
  const email = req.body.email
  const password = req.body.password
  const user = await User.findOne({ email: email })
  const validPassword = await bcrypt.compare(password, user.password)

  if (!user) {
    return res.status(403).json('Пользователь не найден')
  }

  if (!validPassword) {
    return res.status(403).json('Пользователь не найден')
  }

  next();
};