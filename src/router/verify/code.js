import Cookies from 'js-cookie'

const VERIFY_CODE = 'VERIFY-CODE'

export default {
  set: code => Cookies.set(VERIFY_CODE, code),
  get: _ => Cookies.get(VERIFY_CODE),
  remove: _ => Cookies.remove(VERIFY_CODE),
  validate() {
    console.debug('this.get():', this.get())
    return this.get() === '700000'
  }
}
