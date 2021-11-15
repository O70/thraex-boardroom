<template>
  <el-dialog
    :visible="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    width="400px"
    top="15%"
    :title="`手机号码: ${label}`"
  >
    <div>
      <el-input v-model.trim="code">
        <template slot="append">
          <span v-if="isSent">{{ counter }}s</span>
          <el-button v-else @click="handleSend">
            {{ isResend ? '重新发送' : '获取验证码' }}
          </el-button>
        </template>
      </el-input>
      <el-alert
        v-show="tips.title"
        :title="tips.title"
        :type="tips.type"
        show-icon
        :closable="false"
      />
    </div>

    <div slot="footer">
      <el-button :disabled="!code" type="primary" @click="handleSubmit">确定</el-button>
      <el-button @click="$router.go(-1)">返回</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { mapActions } from 'vuex'
import { getPhone, send, verify } from './api'

export default {
  data() {
    return {
      phone: '',
      label: '',
      code: '',
      state: '',
      counter: 0,
      tips: {
        title: '',
        type: 'info'
      }
    }
  },
  computed: {
    isSent() {
      return this.state === 'sent'
    },
    isResend() {
      return this.state === 'resend'
    }
  },
  watch: {
    state() {
      if (this.isSent) {
        this.handleTips('验证码已发送到您的手机', 'success')

        this.counter = 60 / 10 / 2
        const timer = setInterval(() => {
          if (this.counter < 1) {
            clearInterval(timer)
            this.handleState('resend')
          } else {
            this.counter--
          }
        }, 1000)
      }
    }
  },
  created() {
    getPhone().then(data => {
      this.phone = data
      this.label = data.replace(/(\d{3})\d{6}(\d{2})/, `$1${'*'.repeat(6)}$2`)
    })
  },
  methods: {
    ...mapActions('verify', ['set']),
    handleState(val) {
      this.state = val
    },
    handleTips(title, type) {
      Object.assign(this.tips, { title, type })
    },
    handleSend() {
      send(this.phone)
        .then(_ => this.handleState('sent'))
        .catch(_ => {
          this.handleState('resend')
          this.handleTips('发送验证码失败', 'error')
        })
    },
    handleSubmit() {
      const { code } = this

      if (code) {
        verify(this.phone, code).then(valid => {
          if (valid) {
            this.set(code)

            const { query: { path, query }} = this.$route
            this.$router.replace({ path, query })
          } else {
            this.handleTips('无效验证码', 'error')
          }
        })
      } else {
        this.handleTips('请输入验证码', 'error')
      }
    }
  }
}
</script>
<style scoped>
::v-deep .el-dialog__body {
  padding-top: 10px;
  padding-bottom: 10px;
}

.el-alert {
  margin-top: 10px;
}
</style>
