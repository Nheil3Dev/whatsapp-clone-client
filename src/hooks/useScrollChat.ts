import { useEffect, useRef, useState } from 'react'
import { IMessage } from '../types/types'

export function useScrollChat (messages: IMessage[]) {
  const containerRef = useRef<HTMLElement>(null)
  const [showScrollButton, setShowScrollButton] = useState(false)

  const handleScrollButtonClick = () => {
    const container = containerRef.current

    if (container) {
      container.scrollTop = container.scrollHeight
    }
  }

  useEffect(() => {
    const container = containerRef.current

    const scrollToBottom = () => {
      if (container) {
        const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight
        setShowScrollButton(!isAtBottom)
      }
    }

    if (container) {
      container.scrollTop = container.scrollHeight
      container.addEventListener('scroll', scrollToBottom)
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', scrollToBottom)
      }
    }
  }, [messages])

  return { showScrollButton, handleScrollButtonClick, containerRef }
}
