import { model, Schema } from 'mongoose'


const User = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  avatar: {type: String, required: true, defaultValue: 'avatar.jpg'}
}, { timestamps: true })

export default model('User', User)