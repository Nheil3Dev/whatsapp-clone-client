import { useEffect, useState } from 'react'
import { getAllChats } from '../services/getAllChats'
import { IChat } from '../types/types'

const USER = 'cd89bf8f-e422-47f5-867d-2567caf3e476'

export function useChats () {
  const [chats, setChats] = useState<IChat[]>([])
  useEffect(() => {
    getAllChats(USER)
      .then(chats => {
        setChats(chats)
      })
  }, [])
  return { chats, setChats }
}
