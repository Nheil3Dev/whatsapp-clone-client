import { EmojiClickData } from 'emoji-picker-react'
import { UserInfoAction } from '../reducers/userInfoReducer'

export const initUserInfo = ({ alias, info }: { alias: string, info: string }): UserInfoAction => {
  return { type: 'init', payload: { alias, info } }
}

export const uploadData: UserInfoAction = { type: 'upload_data' }

export const changeAlias = (alias: string): UserInfoAction => {
  return { type: 'change_formData_alias', payload: { alias } }
}

export const changeInfo = (info: string): UserInfoAction => {
  return { type: 'change_formData_info', payload: { info } }
}

export const toggleInputAlias: UserInfoAction = { type: 'toggle_visible_alias_input' }

export const toggleInputInfo: UserInfoAction = { type: 'toggle_visible_info_input' }

export const toggleEmojiAlias: UserInfoAction = { type: 'toggle_visible_alias_emoji' }

export const toggleEmojiInfo: UserInfoAction = { type: 'toggle_visible_info_emoji' }

export const printEmojiAlias = (emojiObject: EmojiClickData): UserInfoAction => {
  return { type: 'print_emoji_alias', payload: { emojiObject } }
}

export const printEmojiInfo = (emojiObject: EmojiClickData): UserInfoAction => {
  return { type: 'print_emoji_info', payload: { emojiObject } }
}

export const closeInputs: UserInfoAction = { type: 'close_inputs' }
