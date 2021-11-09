import store from '@/store'

export async function getPhone() {
  console.group('Get phone')
  console.debug('userId:', store.getters.userId)
  console.debug('Mock request...')
  console.groupEnd()

  return '18210413717'
}

export async function send(phone) {
  // return void
  console.group('Send')
  console.debug('phone:', phone)
  console.debug('Mock request...')
  console.groupEnd()

  // throw new Error('ggg')
  
  // return '700000'
}

export async function verify(phone, code) {
  // return boolean
  console.group('Verify code')
  console.debug('phone:', phone)
  console.debug('code:', code)
  console.debug('result:', code === '700000')
  console.debug('Mock request...')
  console.groupEnd()

  return code === '700000'
}
