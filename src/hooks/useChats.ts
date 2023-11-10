import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/userContext'
import { getAllChats } from '../services/getAllChats'
import { IChat, IMessage } from '../types/types'

export function useChats (messages: IMessage[]) {
  const [chats, setChats] = useState<IChat[]>([])
  const { user } = useContext(UserContext)

  useEffect(() => {
    if (!user) return
    getAllChats(user.id)
      .then(chats => {
        const newChats = chats.map((chat: IChat) => {
          const newChat = {
            ...chat,
            messages: messages.filter(msg => msg.groupId === chat.id || msg.conversationId === chat.id)
          }
          return newChat
        })
        setChats(newChats)
      })
  }, [messages, user?.id])

  return { chats, setChats }
}
