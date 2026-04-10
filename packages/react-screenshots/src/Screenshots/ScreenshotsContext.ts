import React, { Dispatch, SetStateAction } from 'react'
import { EmiterRef, History, Bounds, CanvasContextRef, GlobalData, TranslatedImage } from './types'
import zhCN, { Lang } from './zh_CN'

export interface ScreenshotsContextStore {
  url?: string
  image: HTMLImageElement | null
  width: number
  height: number
  lang: Lang
  emiterRef: EmiterRef
  canvasContextRef: CanvasContextRef
  history: History
  bounds: Bounds | null
  cursor?: string
  operation?: string,
  globalData?: GlobalData | null
  translatedImage?: TranslatedImage | null
}

export interface ScreenshotsContextDispatcher {
  call?: <T>(funcName: string, ...args: T[]) => void
  setHistory?: Dispatch<SetStateAction<History>>
  setBounds?: Dispatch<SetStateAction<Bounds | null>>
  setCursor?: Dispatch<SetStateAction<string | undefined>>
  setOperation?: Dispatch<SetStateAction<string | undefined>>
  setGlobalData?: Dispatch<SetStateAction<string | undefined>>
  setTranslatedImage?: Dispatch<SetStateAction<TranslatedImage | null>>
}

export interface ScreenshotsContextValue {
  store: ScreenshotsContextStore
  dispatcher: ScreenshotsContextDispatcher
}

export default React.createContext<ScreenshotsContextValue>({
  store: {
    url: undefined,
    image: null,
    width: 0,
    height: 0,
    lang: zhCN,
    emiterRef: { current: {} },
    canvasContextRef: { current: null },
    history: {
      index: -1,
      stack: []
    },
    bounds: null,
    cursor: 'move',
    operation: undefined,
    globalData: null,
    translatedImage: null
  },
  dispatcher: {
    call: undefined,
    setHistory: undefined,
    setBounds: undefined,
    setCursor: undefined,
    setOperation: undefined,
    setGlobalData: undefined,
    setTranslatedImage: undefined
  }
})
