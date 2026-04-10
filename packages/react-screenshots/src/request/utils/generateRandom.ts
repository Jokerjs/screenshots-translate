export default function generateRandom (length = 16) {
  let result = ''
  for (let i = 0; i < length; i++) {
    const randomASCII = Math.floor(Math.random() * 26) + 97 // 生成97-122之间的随机ASCII码（小写字母）
    result += String.fromCharCode(randomASCII)
  }
  return result
}
