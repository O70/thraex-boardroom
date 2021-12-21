<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>Single</span>
    </div>
    <el-upload
      action="/api/thraex/upload/final"
      drag
      multiple
      :data="{
        app: 'test-app',
        dir: 'd1/d2/d3'
      }"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
  </el-card>
</template>
