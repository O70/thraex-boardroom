import Cookies from 'js-cookie'
import CryptoJS from 'crypto-js'
import store from '@/store'

class Crypto {
  constructor() {
    const [key, iv] = ['68C14256C489424C', 'B25884CCED0E6181']

    this.key = this.parse(key)
    this.iv = this.parse(iv)
    this.cfg = { iv: this.iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
  }

  parse(d) {
    return CryptoJS.enc.Utf8.parse(d)
  }

  encrypt(data) {
    return CryptoJS.AES.encrypt(this.parse(data), this.key, this.cfg).ciphertext.toString().toUpperCase()
  }

  decrypt(data) {
    if (!data) return

    const enc = CryptoJS.enc
    const words = enc.Hex.parse(data)
    const text = enc.Base64.stringify(words)

    return CryptoJS.AES.decrypt(text, this.key, this.cfg).toString(enc.Utf8)
  }
}

export const crypto = new Crypto()

const VERIFY_CODE = 'VERIFY-CODE'

const get = _ => Cookies.get(VERIFY_CODE)

export default {
  set: code => Cookies.set(VERIFY_CODE, crypto.encrypt(code)),
  get,
  remove: _ => Cookies.remove(VERIFY_CODE),
  native: _ => crypto.decrypt(get()),
  validate() {
    const native = this.native()
    const code = store.state.verify.code

    return native && code && native === code
  }
}
