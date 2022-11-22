import * as uuid from 'uuid'
import * as path from 'path'

class FileService {
  save(file) {
    try {
      const fileName = uuid.v4() + '.jpg'
      const filePath = path.resolve('static', fileName)
      file.avatar.mv(filePath)
      return fileName
    } catch (e) {
      console.log(e)
    }
  }
}

export default new FileService()