import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import Screenshots from '../Screenshots'
import { Bounds, GlobalData } from '../Screenshots/types'
import './app.less'
import imageUrl from './images.png'

export default function App (): ReactElement {
  const [globalData, setGlobalData] = useState<GlobalData | null>(null)

  const onSave = useCallback((blob: Blob | null, bounds: Bounds) => {
    console.log('save', blob, bounds)
    if (blob) {
      const url = URL.createObjectURL(blob)
      console.log(url)
      window.open(url)
    }
  }, [])
  const onCancel = useCallback(() => {
    console.log('cancel')
  }, [])
  const onOk = useCallback((blob: Blob | null, bounds: Bounds) => {
    console.log('ok', blob, bounds)
    if (blob) {
      const url = URL.createObjectURL(blob)
      console.log(url)
      window.open(url)
    }
  }, [])
  const onTranslate = useCallback((blob: Blob | null, bounds: Bounds) => {
    console.log('ok', blob, bounds)
    if (blob) {
      const url = URL.createObjectURL(blob)
      console.log(url)
      window.open(url)
    }
  }, [])

  const onTranslateError = useCallback(
    async (error: any) => {
      console.log(error)
    },
    []
  )

  const onSetGlobalData = (globalData: GlobalData) => {
    console.log('setGlobalData', globalData)
    localStorage.setItem('globalData', JSON.stringify(globalData))
    setGlobalData(globalData)
  }

  useEffect(() => {
    onSetGlobalData({
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJMb2dpblR5cGUiOjIsIkFjY291bnRUeXBlIjozLCJJbnZpdGVDb2RlIjoidGVzdGphcnkiLCJNdWxEZXZpY2VMb2dpbiI6MSwiSW52aXRlQ29kZUlEIjoxNDc3MiwiVXNlcklEIjo4MDAwLCJVc2VyRW1wbG95ZWVJRCI6MCwiVXNlckVtcGxveWVlR3JvdXBJRCI6MCwiSW52aXRlQ29kZUFyciI6bnVsbCwiSW52aXRlQ29kZUlEQXJyIjpudWxsLCJleHAiOjE3NzQ0MDM1MzYsIm5iZiI6MTc2OTIxOTUzNiwiaWF0IjoxNzY5MjE5NTM2fQ.08jX13ylWoiG8t-PI8rdsfNP7EJ04yLjv5MeAtfGt5Y',
      url: 'https://api.scrmceo.com',
      machineId: '9038AA15-EFFC-5F5D-915A-DC929002B414_apple',
      version: '1.7.25',
      diffTime: 0
    })
  }, [])

  return (
    <div className='body'>
      <Screenshots
        url={imageUrl}
        width={window.innerWidth}
        height={window.innerHeight}
        lang={{
          operation_rectangle_title: 'Rectangle'
        }}
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
