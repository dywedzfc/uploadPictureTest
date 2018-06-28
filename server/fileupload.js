const multer = require('multer')
const config = require('./config')

const storage = multer.diskStorage({
  // 设置上传文件路径,以后可以扩展成上传至七牛,文件服务器等等
  // Note:如果你传递的是一个函数，你负责创建文件夹，如果你传递的是一个字符串，multer会自动创建
  destination: config.uploadImg.path,
  // TODO:文件区分目录存放
  // 获取文件MD5，重命名，添加后缀,文件重复会直接覆盖
  filename: function (req, file, cb) {
    // const fileFormat = (file.originalname).split('.')
    const fileFormat = file.originalname
    console.info('TEF:', file.toString(), fileFormat)
    // cb(null, file.fieldname + '-' + md5Hash + '.' + fileFormat[fileFormat.length - 1])
    cb(null, file.fieldname + '-' + fileFormat)
  }
})

const upload = multer({
  storage: storage
  // limits:{}
})

module.exports = upload
