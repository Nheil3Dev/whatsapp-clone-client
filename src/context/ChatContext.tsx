import { JSX, createContext, useContext } from 'react'
import { closeChat, selectChat } from '../actions/chatActions'
import { useChat } from '../hooks/useChat'
import { useChats } from '../hooks/useChats'
import { ChatAction, ChatState } from '../reducers/chatReducer'
import { checkConversation } from '../services/checkConversation'
import { deleteChat } from '../services/deleteChat'
import { ChatType, IChat, IUser } from '../types/types'
import { normalizeDate } from '../utils/normalizeDate'
import { SocketContext } from './socketContext'
import { UserContext } from './userContext'

interface IChatContext {
  chatState: ChatState
  dispatchChat: (action: ChatAction) => void
  chats: IChat[]
  setChats: (prop: IChat[]) => void
  addNewChat: (prop: IUser) => void
  addNewGroup: (groupName: string, usersId: string[]) => void
  delChat: (groupId: string, type: ChatType) => void
}

export const ChatContext = createContext<IChatContext>({} as IChatContext)

export function ChatProvider ({ children }: { children: JSX.Element }) {
  const { lastMsg, delMsg, modMsg, addConversation, addGroup, createConversation, createGroup, modGroup } = useContext(SocketContext)
  const { user } = useContext(UserContext)
  const { chats, setChats } = useChats(lastMsg, delMsg, modMsg, addConversation, addGroup, modGroup)
  const { chatState, dispatchChat } = useChat(chats)

  const addNewChat = async (contact: IUser) => {
    // Comprobamos que no se haya creado ya
    const isCreated = chats.filter(chat => chat.contactId === contact.id)[0]
    if (isCreated) {
      const chatId = isCreated.id
      dispatchChat(selectChat(chatId))
      return
    // Comprobamos que exista la conversación aunque nos hayamos salido de ella
    } else {
      if (!user || !contact) return
      const newChat = await checkConversation(user.id, contact.id ?? '')
      if (newChat?.id) {
        setChats([newChat, ...chats])
        dispatchChat(selectChat(newChat.id))
        return
      }
    }

    // Creamos nueva conversación
    const newChat = {
      id: String(crypto.randomUUID()),
      date: normalizeDate(),
      usersId: [user?.id ?? '', contact?.id ?? '']
    }

    await createConversation(newChat.id, newChat.date, newChat.usersId)
    dispatchChat(selectChat(newChat.id))
  }

  const addNewGroup = async (groupName: string, usersId: string[]) => {
    if (!user) return
    const newGroup = {
      id: String(crypto.randomUUID()),
      name: groupName,
      date: normalizeDate(),
      admin: user?.id
    }

    // Añadimos el id del propio usuario
    usersId.push(user.id)

    await createGroup(newGroup.id, newGroup.name, newGroup.date, newGroup.admin, usersId)
    dispatchChat(selectChat(newGroup.id))
  }

  const delChat = async (chatId: string, type: ChatType) => {
    if (!user) return

    const response = await deleteChat(user?.id, chatId, type)

    if (response) {
      const newChats = chats.filter(chat => chat.id !== chatId)
      setChats(newChats)

      if (chatState.activeChat === chatId) {
        dispatchChat(closeChat)
      }
    }
  }

  return (
    <ChatContext.Provider value={{ chatState, dispatchChat, chats, setChats, addNewChat, addNewGroup, delChat }}>
      {children}
    </ChatContext.Provider>
  )
}
