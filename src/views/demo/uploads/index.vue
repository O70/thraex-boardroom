<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :span="8">
        <upload-single />
      </el-col>
      <el-col :span="8">
        <upload-bundle />
      </el-col>
      <el-col :span="8">
        <upload-folder />
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  components: {
    UploadSingle: () => import('./single.vue'),
    UploadBundle: () => import('./bundle.vue'),
    UploadFolder: () => import('./folder.vue')
  }
}
</script>
