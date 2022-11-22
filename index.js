import * as dotenv from "dotenv"
dotenv.config()
import express from "express"
import mongoose from 'mongoose'
import cors from "cors"
import router from "./router/router.js"
import fileUpload from "express-fileupload"

const PORT = process.env.PORT | 5000

const app = express()
app.use(express.json())
app.use('/api', express.static('static'))
app.use(fileUpload({}))
app.use(cors())
app.use('/api', router)

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    app.listen(PORT, () => console.log('server started o port ' + PORT))
  } catch (e) {
    console.log(e)
  }
}

start()