import { useEffect, useState } from 'react'
import { USER } from '../constants/user'
import { getAllChats } from '../services/getAllChats'
import { IChat } from '../types/types'

export function useChats () {
  const [chats, setChats] = useState<IChat[]>([])
  useEffect(() => {
    getAllChats(USER.id)
      .then(chats => {
        setChats(chats)
      })
  }, [])
  return { chats, setChats }
}
