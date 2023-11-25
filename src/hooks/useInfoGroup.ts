import { Reducer, useContext, useEffect, useReducer } from 'react'
import { initialValue } from '../actions/infoChatActions'
import { ChatContext } from '../context/chatContext'
import { infoChatInitialState, infoChatReducer, type InfoChatAction, type InfoChatState } from '../reducers/infoChatReducer'
import { changeGroupInfo } from '../services/changeGroupInfo'

export function useInfoGroup () {
  const [infoChatState, dispatch] = useReducer<Reducer<InfoChatState, InfoChatAction>>(infoChatReducer, infoChatInitialState)
  const { chatState, chats, setChats } = useContext(ChatContext)
  const { formData } = infoChatState
  const { chat } = chatState

  const uploadGroupData = () => {
    if (chat?.name === formData.name && chat?.info === formData.info) return
    return changeGroupInfo(chat?.id, formData)
      .then(res => {
        if (res.rowsAffected === 1 && chat) {
          const newChat = { ...chat, ...formData }
          const index = chats?.findIndex(chatItem => chatItem.id === chat.id)
          const newChats = [...chats]
          newChats[index] = newChat
          setChats(newChats)
        }
      })
  }

  useEffect(() => {
    const newDataForm = {
      name: chat?.name ?? '',
      info: chat?.info ?? ''
    }
    dispatch(initialValue(newDataForm))
  }, [chat])

  return {
    infoChatState,
    dispatch,
    uploadGroupData
  }
}
