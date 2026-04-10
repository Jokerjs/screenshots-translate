import React, { ReactElement, useCallback, useState } from 'react'
import useStore from '../../hooks/useStore'
import useCall from '../../hooks/useCall'
import useCanvasContextRef from '../../hooks/useCanvasContextRef'
import useHistory from '../../hooks/useHistory'
import useReset from '../../hooks/useReset'
import ScreenshotsButton from '../../ScreenshotsButton'
import composeImage from '../../composeImage'
import { Select } from 'antd'
import './index.less'
import { loadImageTranslate } from '../../../request/client/Account'
import { blobToBase64, base64ToBlob } from '../../../request/utils/blobBase64'
import useDispatcher from '../../hooks/useDispatcher'
import googleLangs from './google-langs'

export default function Translate (): ReactElement {
  const { image, width, height, history, bounds, lang, globalData } = useStore()
  const canvasContextRef = useCanvasContextRef()
  const [, historyDispatcher] = useHistory()
  const call = useCall()
  const reset = useReset()
  const { setTranslatedImage } = useDispatcher()
  const [langValue, setLangVlaue] = useState('zh-CHS')

  const onClick = useCallback(() => {
    historyDispatcher.clearSelect()
    setTimeout(() => {
      if (!canvasContextRef.current || !image || !bounds) {
        return
      }
      console.log('===========globalData=======', lang, globalData)
      const isTranslated = !!(globalData && globalData.token)
      setTranslatedImage?.({
        loading: isTranslated,
        text: isTranslated ? '' : '套餐不支持'
      })
      // 不支持翻译
      if (!isTranslated) {
        return
      }
      composeImage({
        image,
        width,
        height,
        history,
        bounds
      }).then(async blob => {
        const imageBase: any = await blobToBase64(blob)
        try {
          const result = await loadImageTranslate({
            imageBase,
            targetLanguage: langValue
          })
          const translatedImage = result?.data?.text
          if (translatedImage) {
            const translatedBlob: Blob = base64ToBlob(translatedImage, 'image/png')
            call('onTranslate', translatedBlob, bounds)
            setTranslatedImage?.({
              loading: false,
              text: '',
              blob: translatedBlob,
              base64: 'data:image/png;base64,' + translatedImage
            })
          }
        } catch (e: any) {
          call('onTranslateError', e)
          setTranslatedImage?.({
            text: e.message || '翻译出错了'
          })
        }
      })
    })
  }, [historyDispatcher, canvasContextRef, image, bounds, lang, globalData, setTranslatedImage, width, height, history, langValue])

  return (
    <div className='translate-nav'>
      <Select value={langValue} className='ant-select' options={googleLangs} size='small' onSelect={setLangVlaue} />
      <ScreenshotsButton title={lang.operation_translate_title} icon='iconfont-fanyi' onClick={onClick} />
    </div>
  )
}
