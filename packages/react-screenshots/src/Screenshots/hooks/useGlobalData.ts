import useStore from './useStore'
import { GlobalData } from '../types'

export default function useGlobalData (): GlobalData | null | undefined {
  const { globalData } = useStore()

  return globalData
}
