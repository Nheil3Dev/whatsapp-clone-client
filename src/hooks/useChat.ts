import { useEffect, useState } from 'react'
import { getAllUsersGroup } from '../services/getAllUsersGroup'
import { IChat, IUser } from '../types/types'

export function useChat (chats: IChat[]) {
  const [activeChat, setActiveChat] = useState<string>('')
  const [chat, setChat] = useState<IChat>({} as IChat)
  const [groupUsers, setGroupUsers] = useState<IUser[]>([])

  useEffect(() => {
    const activedChat = chats.filter(chat => chat.id === activeChat)[0]
    setChat(activedChat)
  }, [activeChat, chats])

  useEffect(() => {
    if (chat?.admin) {
      getAllUsersGroup(chat?.id)
        .then(users => setGroupUsers(users))
    }
  }, [chat])

  return { chat, setChat, activeChat, setActiveChat, groupUsers, setGroupUsers, groupLength: groupUsers.length }
}
