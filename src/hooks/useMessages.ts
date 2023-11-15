import { useDeferredValue, useEffect, useState } from 'react'
import { getAllFilteredMsg } from '../services/getAllFilteredMsg'
import { IMessage } from '../types/types'

export function useMessages (chatId: string) {
  const [filteredMsgs, setFilteredMsgs] = useState<IMessage[]>([])
  const deferredFilteredMsgs = useDeferredValue(filteredMsgs)
  const [filter, setFilter] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (filter.length <= 1) {
      setIsLoading(false)
      return
    }
    setIsLoading(true)
    const index = setTimeout(() => {
      getAllFilteredMsg(chatId, filter)
        .then(msgs => {
          setFilteredMsgs(msgs)
          setIsLoading(false)
        })
    }, 300)

    return () => clearTimeout(index)
  }, [filter])
  return { filter, setFilter, isLoading, deferredFilteredMsgs }
}
