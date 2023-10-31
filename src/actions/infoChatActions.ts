import { InfoChatAction } from '../reducers/infoChatReducer'

export const toggleInputName: InfoChatAction = { type: 'toggle_show_name_input' }

export const toggleInputInfo: InfoChatAction = { type: 'toggle_show_info_input' }

export const closeAll: InfoChatAction = { type: 'close_all' }

export const changeName = (name: string): InfoChatAction => {
  return { type: 'change_name_value', payload: { name } }
}

export const changeInfo = (info: string): InfoChatAction => {
  return { type: 'change_info_value', payload: { info } }
}

export const initialValue = ({ name, info }: { name: string, info: string}): InfoChatAction => {
  return { type: 'charge_initial_value', payload: { name, info } }
}
