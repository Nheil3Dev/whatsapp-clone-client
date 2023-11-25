import { ChatAction } from '../reducers/chatReducer'
import { IChat, IUser } from '../types/types'

export const selectChat = (activeChat: string): ChatAction => {
  return {
    type: 'select_chat',
    payload: { activeChat }
  }
}

export const openChat = (chat: IChat): ChatAction => {
  return {
    type: 'open_chat',
    payload: { chat }
  }
}

export const getGroupUsers = (groupUsers: IUser[]): ChatAction => {
  return {
    type: 'get_users',
    payload: { groupUsers }
  }
}

export const selectEditMsg = (msgId: number): ChatAction => {
  return {
    type: 'edit_msg',
    payload: { msgId }
  }
}

export const closeChat: ChatAction = { type: 'close_chat' }

export const clearEdit: ChatAction = { type: 'clear_edit' }
