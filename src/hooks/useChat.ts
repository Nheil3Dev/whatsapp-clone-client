import { Reducer, useEffect, useReducer } from 'react'
import { getGroupUsers, openChat } from '../actions/chatActions'
import { ChatAction, ChatState, chatInitialState, chatReducer } from '../reducers/chatReducer'
import { getAllUsersGroup } from '../services/getAllUsersGroup'
import { IChat } from '../types/types'

export function useChat (chats: IChat[]) {
  const [chatState, dispatchChat] = useReducer<Reducer<ChatState, ChatAction>>(chatReducer, chatInitialState)
  const { activeChat, chat } = chatState

  useEffect(() => {
    const activedChat = chats.filter(chat => chat.id === activeChat)[0]
    dispatchChat(openChat(activedChat))
  }, [activeChat, chats])

  useEffect(() => {
    if (chat?.admin) {
      getAllUsersGroup(chat?.id)
        .then(users => {
          dispatchChat(getGroupUsers(users))
        })
    }
  }, [chat])

  return { chatState, dispatchChat }
}
