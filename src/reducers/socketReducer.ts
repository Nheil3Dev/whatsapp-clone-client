import { IAddConversation, IAddGroup, IDelMsg, IMessage, IModGroup, IModMsg } from '../types/types'

export interface SocketState {
  isConnected: boolean
  messages: IMessage[]
  lastMsg: IMessage
  delMsg: IDelMsg
  modMsg: IModMsg
  addConversation: IAddConversation
  addGroup: IAddGroup
  modGroup: IModGroup
}

export const socketInitialState = {
  isConnected: false,
  messages: [] as IMessage[],
  lastMsg: {} as IMessage,
  delMsg: { msgId: 0, chatId: '' },
  modMsg: { msgId: 0, content: '', chatId: '' },
  addConversation: { conversationId: '', usersId: [] as string[] },
  addGroup: { groupId: '', usersId: [] as string[] },
  modGroup: { groupId: '', name: '', info: '' }
}

export type SocketActions =
| { type: 'connect' }
| { type: 'disconnect' }
| { type: 'get_msg', payload: { message: IMessage } }
| { type: 'delete_msg', payload: { delMsg: IDelMsg } }
| { type: 'modify_msg', payload: { modMsg: IModMsg } }
| { type: 'add_conversation', payload: { addConversation: IAddConversation } }
| { type: 'add_group', payload: { addGroup: IAddGroup } }
| { type: 'modify_group', payload: { modGroup: IModGroup } }

export const socketReducer = (state: SocketState = socketInitialState, action: SocketActions): SocketState => {
  const { type } = action

  switch (type) {
    case 'connect':
      return {
        ...state,
        isConnected: true
      }

    case 'disconnect':
      return {
        ...state,
        isConnected: false,
        messages: [],
        lastMsg: {} as IMessage
      }

    case 'get_msg':
      return {
        ...state,
        messages: [...state.messages, action.payload.message],
        lastMsg: action.payload.message
      }

    case 'modify_msg':
      return {
        ...state,
        modMsg: action.payload.modMsg
      }

    case 'delete_msg':
      return {
        ...state,
        delMsg: action.payload.delMsg
      }

    case 'add_conversation':
      return {
        ...state,
        addConversation: action.payload.addConversation
      }

    case 'add_group':
      return {
        ...state,
        addGroup: action.payload.addGroup
      }

    case 'modify_group':
      return {
        ...state,
        modGroup: action.payload.modGroup
      }

    default:
      return state
  }
}
