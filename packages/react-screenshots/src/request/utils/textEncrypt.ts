import CryptoJS from 'crypto-js'

// 配置参数
// AesKey: LrbLutiqz284z1d2
// AesIV: zNdkwnkFrXvYVcCb
// AesKeyNew: aulXuKKmTAdwuSCe
// AesIVNew: qKsqoFCMP05WNsLd

const clientKey = CryptoJS.enc.Utf8.parse('LrbLutiqz284z1d2')
const clientIv = CryptoJS.enc.Utf8.parse('zNdkwnkFrXvYVcCb')

const serverKey = CryptoJS.enc.Utf8.parse('aulXuKKmTAdwuSCe')
const serverIv = CryptoJS.enc.Utf8.parse('qKsqoFCMP05WNsLd')

// 判断是否为普通对象
function isPlainObject (value) {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value)
  )
}

// 加密函数
export function aesEncrypt (plainText, key = serverKey, iv = serverIv) {
  if (isPlainObject(plainText)) {
    plainText = JSON.stringify(plainText)
  }
  const encrypted = CryptoJS.AES.encrypt(plainText, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString() // 默认 base64 输出
}

// 解密函数
export function aesDecrypt (cipherText, key = serverKey, iv = serverIv) {
  const decrypted = CryptoJS.AES.decrypt(cipherText, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  const str = decrypted.toString(CryptoJS.enc.Utf8)
  try {
    return JSON.parse(str)
  } catch (err) {
    return str
  }
}

export function aesEncryptClient (plainText) {
  return aesEncrypt(plainText, clientKey, clientIv)
}

export function aesDecryptClient (cipherText) {
  return aesDecrypt(cipherText, clientKey, clientIv)
}
