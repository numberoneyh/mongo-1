import { model, Schema } from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const Todo = new Schema({
  title: { type: String, required: true },
  complete: { type: Boolean, defaultValue: false },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true })

Todo.plugin(paginate)

export default model('Todo', Todo)