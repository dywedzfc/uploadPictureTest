const express = require('express')
const app = express()

const upload = require('./fileupload')

app.use(function (req, res, next) {
  // Website you wish to allow to connect - 您希望允许连接的网站
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')

  // Request methods you wish to allow - 您希望允许的请求方法
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

  // Request headers you wish to allow - 您希望允许的请求标头
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

  // Set to true if you need the website to include cookies in the requests sent - 如果您需要网站在发送的请求中包含Cookie，请设置为true
  // to the API (e.g. in case you use sessions) - 到API（例如，如果您使用会话）
  res.setHeader('Access-Control-Allow-Credentials', true)

  // Pass to next layer of middleware - 传递到下一层中间件
  next()
})

app.post('/upload', upload.single('avatar'), function (req, res) {
  if (req.file) {
    console.log('file', req.file)
    console.log('body', req.body)
    return res.json({msg: '成功...'})
  }
  return res.json({msg: '失败...'})
})

app.get('/hello', function (req, res) {
  res.send('<h1>欢迎光临我的博客！</h1>')
})

app.listen(3001, function () {
  const host = this.address().address
  const port = this.address().port
  console.log('服务器启动host：' + host + '，port： ' + port)
})

// module.exports = router
