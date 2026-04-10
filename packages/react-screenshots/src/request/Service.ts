import axios from 'axios'
import generateRandom from './utils/generateRandom'
import CryptoJS from 'crypto-js'
import { md5, calculateSHA256 } from './utils/cdnMd5'
import { aesEncrypt, aesDecrypt } from './utils/textEncrypt'

const VITE_APP_API_KEY = 'Q4N8sPZfC2R9YVJ6k_5HAXmT0L1u7WbEdBS'
const VITE_APP_API_SERVER_KEY = 'NsRGmBGR3AWCvBwq'
const _options = {
  baseURL: '',
  timeout: 60000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' }
}
export default class {
  service: any
  config: any

  constructor (options = {}) {
    this.config = Object.assign(_options, options)

    this.service = null
    this.init()
  }

  init () {
    this.service = axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout,
      headers: this.config.headers
    })

    this.interceptors()
  }

  getCdnHeader (diffTime = 0) {
    const timestamp = Math.floor(Date.now() / 1000) + (diffTime || 0)
    const key = md5(VITE_APP_API_KEY + '&&&' + timestamp + 'ceoscrm')
    // 组合待签名字符串：apiKey + timestamp
    const message = key + timestamp
    // 生成签名
    const sign = calculateSHA256(message)
    return {
      'X-Custom-Sign': sign,
      'X-API-Key': key,
      'X-Timestamp': timestamp
    }
  }

  // 服务器header
  getServerHeader (diffTime = 0) {
    const timestamp = Math.floor(Date.now() / 1000) + (diffTime || 0)
    const nonceStr = generateRandom()
    const signKey = VITE_APP_API_SERVER_KEY
    return {
      Nonce: nonceStr,
      Sign: CryptoJS.MD5(nonceStr + signKey).toString(),
      Timestamp: timestamp
    }
  }

  interceptors () {
    this.service.interceptors.request.use(async config => {
      const globalDataStr: any = localStorage.getItem('globalData')
      const globalData = JSON.parse(globalDataStr)
      console.log('======', globalData)

      config.headers['Device-ID'] = encodeURIComponent(globalData.machineId)
      config.headers.Version = globalData.version
      config.headers.Authorization = globalData.token

      // 随机签名
      if (config.sign !== false) {
        const serverHeader = this.getServerHeader(globalData.diffTime)
        Object.assign(config.headers, serverHeader)
      }

      if (config.baseURL !== globalData.url) {
        config.baseURL = globalData.url
      }

      // cdn签名
      if (config.cdnSign !== false) {
        const cdnHeader = this.getCdnHeader(globalData.diffTime)
        Object.assign(config.headers, cdnHeader)
      }

      if (config.isEncrypt) {
        console.log(config.data)
        config.data = {
          text: aesEncrypt(config.data)
        }
      }

      return config
    }, error => {
      return Promise.reject(error)
    })

    // HTTPresponse拦截
    const errMsg = this.errMsg.bind(this)
    this.service.interceptors.response.use(response => {
      console.log(response)
      if (response.config.isEncrypt) {
        response.data = aesDecrypt(response.data)
        console.log(response.data)
      }
      const code = response.data.code
      if (code === 0) {
        return response.data
      } else if (code === 401) {
        return Promise.reject(response.data)
      } else {
        return Promise.reject(response.data)
      }
    }, errMsg)
  }

  errMsg (error: any) {
    if (!error.response) {
      return Promise.reject(error)
    }
    if (error.response && error.response.data) {
      const data = error.response.data
      switch (error.response.status) {
        case 401:
          return Promise.reject(data)
          break
        default:
          return Promise.reject(data)
      }
    }
  }
}
