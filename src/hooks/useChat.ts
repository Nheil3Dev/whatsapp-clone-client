import { useEffect, useState } from 'react'
import { getAllUsersGroup } from '../services/getAllUsersGroup'
import { IChat, IUser } from '../types/types'

export function useChat (chats: IChat[]) {
  const [activeChat, setActiveChat] = useState<string>('')
  const [chat, setChat] = useState<IChat>()
  const [groupUsers, setGroupUsers] = useState<IUser[]>([])

  useEffect(() => {
    if (chats && !chat) {
      setChat(chats[0])
      // setActiveChat(chats[0]?.id)
    } else {
      const newChat = chats.filter(chat => chat.id === activeChat)
      setChat(newChat[0])
    }
  }, [activeChat, chats])

  useEffect(() => {
    if (chat?.admin) {
      getAllUsersGroup(chat?.id)
        .then(users => setGroupUsers(users))
    }
  }, [chat])
  return { chat, setChat, activeChat, setActiveChat, groupUsers, setGroupUsers, groupLength: groupUsers.length }
}
