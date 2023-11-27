import { SocketActions } from '../reducers/socketReducer'
import { IAddConversation, IAddGroup, IDelMsg, IMessage, IModGroup, IModMsg } from '../types/types'

export const connect: SocketActions = { type: 'connect' }

export const disconnect: SocketActions = { type: 'disconnect' }

export const getMsg = (message: IMessage): SocketActions => {
  return {
    type: 'get_msg',
    payload: { message }
  }
}

export const modMsg = (modMsg: IModMsg): SocketActions => {
  return {
    type: 'modify_msg',
    payload: { modMsg }
  }
}

export const delMsg = (delMsg: IDelMsg): SocketActions => {
  return {
    type: 'delete_msg',
    payload: { delMsg }
  }
}

export const addConversation = (addConversation: IAddConversation): SocketActions => {
  return {
    type: 'add_conversation',
    payload: { addConversation }
  }
}

export const addGroup = (addGroup: IAddGroup): SocketActions => {
  return {
    type: 'add_group',
    payload: { addGroup }
  }
}

export const modGroup = (modGroup: IModGroup): SocketActions => {
  return {
    type: 'modify_group',
    payload: { modGroup }
  }
}
