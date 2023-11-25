import { IChat, IUser } from '../types/types'

export interface ChatState {
  chat: IChat
  activeChat: string
  groupUsers: IUser[]
  editMsgId: number
}

export type ChatAction =
| { type: 'select_chat', payload: { activeChat: string } }
| { type: 'open_chat', payload: { chat: IChat } }
| { type: 'get_users', payload: { groupUsers: IUser[] }}
| { type: 'close_chat' }
| { type: 'edit_msg', payload: { msgId: number }}
| { type: 'clear_edit' }

export const chatInitialState: ChatState = {
  chat: {} as IChat,
  activeChat: '',
  groupUsers: [],
  editMsgId: 0
}

export const chatReducer = (state: ChatState = chatInitialState, action: ChatAction): ChatState => {
  const { type } = action

  switch (type) {
    case 'select_chat':
      return {
        ...state,
        activeChat: action.payload.activeChat
      }

    case 'open_chat':
      return {
        ...state,
        chat: action.payload.chat
      }

    case 'get_users':
      return {
        ...state,
        groupUsers: action.payload.groupUsers
      }

    case 'close_chat':
      return chatInitialState

    case 'edit_msg':
      return {
        ...state,
        editMsgId: action.payload.msgId
      }

    case 'clear_edit':
      return {
        ...state,
        editMsgId: 0
      }
  }
}
