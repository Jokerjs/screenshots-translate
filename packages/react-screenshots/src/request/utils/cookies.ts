// 改成了localStorage储存，聊天需要扩展长度
import { aesEncrypt, aesDecrypt } from './textEncrypt'

const $cookies = {
  setCookie (name, value) {
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    } else {
      value = String(value)
    }
    value = aesEncryptClient(value)
    localStorage.setItem(name, value)
  },
  getCookie (name) {
    let ret
    ret = localStorage.getItem(name)
    try {
      if (ret) {
        ret = aesDecryptClient(ret)
      }
      return JSON.parse(ret)
    } catch (err) {
      return ret
    }
  },
  removeCookie (name) {
    localStorage.removeItem(name)
  }
}

export default $cookies
