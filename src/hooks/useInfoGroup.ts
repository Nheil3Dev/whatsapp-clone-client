import { Reducer, useContext, useEffect, useReducer } from 'react'
import { initialValue } from '../actions/infoChatActions'
import { ChatContext } from '../context/chatContext'
import { SocketContext } from '../context/socketContext'
import { infoChatInitialState, infoChatReducer, type InfoChatAction, type InfoChatState } from '../reducers/infoChatReducer'

export function useInfoGroup () {
  const [infoChatState, dispatch] = useReducer<Reducer<InfoChatState, InfoChatAction>>(infoChatReducer, infoChatInitialState)
  const { chatState } = useContext(ChatContext)
  const { modifyGroup } = useContext(SocketContext)
  const { formData } = infoChatState
  const { chat } = chatState

  const uploadGroupData = () => {
    if (chat?.name === formData.name && chat?.info === formData.info) return
    modifyGroup(chat.id, formData.name, formData.info)
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
