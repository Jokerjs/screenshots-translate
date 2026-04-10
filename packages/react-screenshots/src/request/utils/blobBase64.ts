/**
 * @Description: blob转base64
 */
export function blobToBase64 (blob, isType = true) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64 = reader.result.split(',')[1] // 提取 Base64 部分
      const mimeType = blob.type || 'application/octet-stream' // 获取 MIME 类型，默认是 application/octet-stream
      resolve(isType ? `${base64}` : base64)
    }
    reader.onerror = reject
    reader.readAsDataURL(blob) // 读取 Blob 数据并转换为 Data URL
  })
}

/**
 * 将 Base64 转为 Blob
 * @param base64 Base64 字符串（不含 data: 前缀）
 * @param mime MIME 类型，例如 "audio/mpeg" 或 "audio/wav"
 * @returns Blob 对象
 */
export function base64ToBlob (base64: string, mime: string): Blob {
  const byteChars = atob(base64) // 解码 base64
  const byteNumbers = new Array(byteChars.length)

  for (let i = 0; i < byteChars.length; i++) {
    byteNumbers[i] = byteChars.charCodeAt(i)
  }

  const byteArray = new Uint8Array(byteNumbers)
  return new Blob([byteArray], { type: mime })
}
