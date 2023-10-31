import { useDeferredValue, useEffect, useState } from 'react'
import { getAllFilteredMsg } from '../services/getAllFilteredMsg'
import { IMessage } from '../types/types'

export function useMessages () {
  const [filteredMsgs, setFilteredMsgs] = useState<IMessage[]>([])
  const deferredFilteredMsgs = useDeferredValue(filteredMsgs)
  const [filter, setFilter] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (filter.length <= 1) return
    setIsLoading(true)
    const index = setTimeout(() => {
      getAllFilteredMsg(filter)
        .then(msgs => {
          setFilteredMsgs(msgs)
          setIsLoading(false)
        })
    }, 300)

    return () => clearTimeout(index)
  }, [filter])
  return { filter, setFilter, isLoading, deferredFilteredMsgs }
}
