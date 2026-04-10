import React, { useCallback, useEffect, useState } from 'react'
import Screenshots from '../Screenshots'
import { Bounds, GlobalData } from '../Screenshots/types'
import { Lang } from '../Screenshots/zh_CN'
import './app.less'

export interface Display {
  id: number
  x: number
  y: number
  width: number
  height: number
}

export default function App (): JSX.Element {
  const [url, setUrl] = useState<string | undefined>(undefined)
  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)
  const [display, setDisplay] = useState<Display | undefined>(undefined)
  const [lang, setLang] = useState<Lang | undefined>(undefined)
  const [globalData, setGlobalData] = useState<GlobalData | null>(null)

  const onSave = useCallback(
    async (blob: Blob | null, bounds: Bounds) => {
      if (!display || !blob) {
        return
      }
      window.screenshots.save(await blob.arrayBuffer(), { bounds, display })
    },
    [display]
  )

  const onCancel = useCallback(() => {
    window.screenshots.cancel()
  }, [])

  const onOk = useCallback(
    async (blob: Blob | null, bounds: Bounds) => {
      if (!display || !blob) {
        return
      }
      window.screenshots.ok(await blob.arrayBuffer(), { bounds, display })
    },
    [display]
  )
  const onTranslate = useCallback(
    async (blob: Blob | null, bounds: Bounds) => {
      if (!display || !blob) {
        return
      }
      window.screenshots.translate(await blob.arrayBuffer(), { bounds, display })
    },
    [display]
  )
  const onTranslateError = useCallback(
    async (error: any) => {
      window.screenshots.translateError(error)
    },
    []
  )

  useEffect(() => {
    const onSetLang = (lang: Lang) => {
      setLang(lang)
    }

    const onCapture = (display: Display, dataURL: string) => {
      setDisplay(display)
      setUrl(dataURL)
    }

    const onReset = () => {
      setUrl(undefined)
      setDisplay(undefined)
      // 确保截图区域被重置
      requestAnimationFrame(() => window.screenshots.reset())
    }

    const onSetGlobalData = (globalData: GlobalData) => {
      console.log('setGlobalData', globalData)
      localStorage.setItem('globalData', JSON.stringify(globalData))
      setGlobalData(globalData)
    }

    window.screenshots.on('setLang', onSetLang)
    window.screenshots.on('capture', onCapture)
    window.screenshots.on('reset', onReset)
    window.screenshots.on('setGlobalData', onSetGlobalData)
    // 告诉主进程页面准备完成
    window.screenshots.ready()
    return () => {
      window.screenshots.off('capture', onCapture)
      window.screenshots.off('setLang', onSetLang)
      window.screenshots.off('reset', onReset)
      window.screenshots.off('setGlobalData', onSetGlobalData)
    }
  }, [])

  useEffect(() => {
    const onResize = () => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }

    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [onCancel])

  return (
    <div className='body'>
      <Screenshots
        url={url}
        width={width}
        height={height}
        lang={lang}
        globalData={globalData}
        setGlobalData={setGlobalData}
        onSave={onSave}
        onCancel={onCancel}
        onOk={onOk}
        onTranslate={onTranslate}
        onTranslateError={onTranslateError}
      />
    </div>
  )
}
