import request from './index'

/** 图片翻译 */
export function loadImageTranslate (data: any) {
  return request({
    url: '/client/translateEncrypt/imageTranslate',
    method: 'post',
    data,
    isEncrypt: true
  })
}
