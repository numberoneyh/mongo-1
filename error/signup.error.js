import User from '../models/User.js'

export const signupError =  async (req, res, next) => {
  const email = req.body.email
  const candidate = await User.findOne({ email: email })

  if (candidate) {
    return res.status(404).json('Пользователь с таким адресом электронной почты уже существует')
  }

  next();
};