import { useEffect, useState } from 'react'
import { IChat } from '../types/types'

export function useDelay (time: number, chat: IChat) {
  const [delay, setDelay] = useState(false)

  useEffect(() => {
    setDelay(false)
    const id = setTimeout(() => setDelay(true), time)

    return () => clearTimeout(id)
  }, [chat.id])
  return { delay }
}
