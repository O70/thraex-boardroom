<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>Folder</span>
      <el-button
        style="float: right; padding: 3px 0"
        type="text"
        @click="handleUpload"
      >上传</el-button>
    </div>
    <el-upload
      ref="upload"
      action="#"
      :http-request="handleSelect"
      drag
      multiple
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">将文件/文件夹拖到此处，或<em>点击上传</em></div>
    </el-upload>
  </el-card>
</template>
<script>
import request from '@/utils/request'

export default {
  data() {
    return {
      files: []
    }
  },
  mounted() {
    console.log('mounted...')
    this.$refs.upload.$children[0].$refs.input.webkitdirectory = true
  },
  /* updated() {
    this.$nextTick(() => {
      console.log('updated...')
      console.log(document.getElementsByClassName('el-upload__input'))
    })
  }, */
  methods: {
    handleSelect(file) {
      console.log('...', file)
      this.files.push(file)
    },
    handleUpload() {
      const data = new FormData()
      this.files.forEach(it => data.append('files', it.file))

      request({
        url: '/api/thraex/upload/batch',
        method: 'POST',
        data
      })
    }
  }
}
</script>
