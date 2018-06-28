<template>
  <form id='editfile' method='post' enctype='multipart/form-data'>
    <input name="text" type="text"/>
    选择图片：<input name="avatar" id='upfile' type='file' @change="uploadFileImgaeChange"/>
    <input type='button' value='提交' @click="btnUploadFileSubmit"/>
    <br>
    <img :src="base64Img" v-if="base64Img" height="300" alt="">
  </form>
</template>

<script>
import axios from 'axios'
import md5 from 'md5'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      base64Img: ''
    }
  },
  methods: {
    btnUploadFileSubmit () {
      const url = 'http://localhost:3001/upload'
      const file = document.querySelector('#upfile')
      let param = new FormData()
      let splitName = file.value.split('.')
      let suffixName = '.' + splitName[splitName.length - 1]
      param.append('avatar', file.files[0], md5(this.base64Img) + suffixName)
      const config = {
        headers: {'Content-Type': 'multipart/form-data'}
      }
      axios.post(url, param, config).then(function (response) {
        console.log(response)
      }).catch(err => {
        console.log('error:', err)
      })
    },
    uploadFileImgaeChange (e) {
      const _this = this
      const file = e.target.files[0]
      if (!window.FileReader) return
      if (/^image/.test(file.type)) {
        const reader = new FileReader()
        // 将图片将转成 base64 格式
        reader.readAsDataURL(file)
        reader.onloadend = function () {
          _this.base64Img = this.result
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
img {
  margin: 20px;
  padding: 10px;
  border: 1px solid #eee;
}
</style>
