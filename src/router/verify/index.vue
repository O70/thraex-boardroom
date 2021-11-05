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
      console.debug(this.$store)
      this.$store.dispatch('verify/set', 700000)

      const { query, params } = this.$route
      console.debug(query.to)
      // this.$router.replace({ path: query.to, query: { hanzo: 'sd' }, params: { gui: 1 } })
      this.$router.replace({ path: query.to })
    }
  }
}
</script>
