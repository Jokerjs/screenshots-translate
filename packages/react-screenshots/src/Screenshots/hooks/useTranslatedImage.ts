import { useCallback } from 'react'
import useDispatcher from './useDispatcher'
import useStore from './useStore'
import { TranslatedImage } from '../types'

export interface TranslatedImageDispatcher {
  set: (translatedImage: TranslatedImage) => void
  reset: () => void
}

export type TranslatedImageValueDispatcher = [TranslatedImage | null | undefined, TranslatedImageDispatcher]

export default function useTranslatedImage (): TranslatedImageValueDispatcher {
  const { translatedImage } = useStore()
  const { setTranslatedImage } = useDispatcher()

  const set = useCallback(
    (translatedImage: TranslatedImage) => {
      setTranslatedImage?.(translatedImage)
    },
    [setTranslatedImage]
  )

  const reset = useCallback(() => {
    return setTranslatedImage?.(null)
  }, [setTranslatedImage])

  return [
    translatedImage,
    {
      set,
      reset
    }
  ]
}
