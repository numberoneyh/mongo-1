import jwt from 'jsonwebtoken'

export const generateToken = (id, email, password, fullName, avatar) => {
  const payload = {
    id,
    email,
    password,
    fullName,
    avatar
  }
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24h' })
}