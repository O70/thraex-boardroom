<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>Bundle</span>
      <el-button
        style="float: right; padding: 3px 0"
        type="text"
        @click="handleUpload"
      >上传</el-button>
    </div>
    <el-upload
      action="#"
      :http-request="handleSelect"
      drag
      multiple
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
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
  methods: {
    handleSelect(file) {
      console.log('...', file)
      this.files.push(file)
    },
    handleUpload() {
      const data = new FormData()
      data.set('app', 'test-app')
      data.set('dir', 'd1/d2/d3')
      // data.set('other1', { name: 'guiwang', age: 18 }) // rejected value [[object Object]]
      // data.set('other2', { name: 'guiwang', age: 18 }) // rejected value [[object Object]]
      data.set('other3', ['gui', 'wang'])
      this.files.forEach(it => data.append('file', it.file))

      request({
        // url: '/api/thraex/upload/batch',
        // url: '/api/thraex/upload/batch/v1',
        // url: '/api/thraex/upload/batch/v2',
        // url: '/api/thraex/upload/final',
        url: '/api/thraex/upload/final/bundle',
        method: 'POST',
        data
      })
    },
    handleUploadV2() {
      const data = new FormData()
      data.set('app', 'test-app')
      data.set('dir', 'd1/d2/d3')
      // data.set('other1', { name: 'guiwang', age: 18 })
      // data.set('other2', { name: 'guiwang', age: 18 })
      // data.set('other3', ['gui', 'wang'])
      this.files.forEach(it => data.append('file', it.file))

      request({
        url: '/api/thraex/upload/bundle',
        // url: '/api/thraex/upload/bundle/v1',
        // headers: {
        //   'Content-Type': 'multipart/form-data'
        // },
        method: 'POST',
        data
      })
    }
  }
}
</script>
