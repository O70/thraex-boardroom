<template>
  <el-dialog :visible.sync="visible">
    <el-button type="primary" @click="handleOk">确 定</el-button>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      visible: true
    }
  },
  methods: {
    handleOk() {
      this.$store.dispatch('verify/set', 700000)

      const { query: { path, query }} = this.$route
      this.$router.replace({ path, query })
    }
  }
}
</script>
