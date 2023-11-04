import { EmojiClickData } from 'emoji-picker-react'

export interface UserInfo {
  data: { alias: string, info: string}
  formData: { alias: string, info: string}
  visibleInput: { alias: boolean, info: boolean}
  visibleEmoji: { alias: boolean, info: boolean}
}

export type UserInfoAction =
 | { type: 'init', payload: { alias: string, info: string } }
 | { type: 'upload_data' }
 | { type: 'change_formData_alias', payload: { alias: string }}
 | { type: 'change_formData_info', payload: { info: string }}
 | { type: 'toggle_visible_alias_input' }
 | { type: 'toggle_visible_info_input' }
 | { type: 'close_inputs' }
 | { type: 'toggle_visible_alias_emoji' }
 | { type: 'toggle_visible_info_emoji'}
 | { type: 'print_emoji_alias', payload: { emojiObject: EmojiClickData }}
 | { type: 'print_emoji_info', payload: { emojiObject: EmojiClickData }}

export const userInfoInitialState: UserInfo = {
  data: {
    alias: '',
    info: ''
  },
  formData: {
    alias: '',
    info: ''
  },
  visibleInput: {
    alias: false,
    info: false
  },
  visibleEmoji: {
    alias: false,
    info: false
  }
}

export const userInfoReducer = (state: UserInfo, action: UserInfoAction) => {
  const { type } = action

  switch (type) {
    case 'init':
      return {
        ...state,
        data: {
          alias: action.payload.alias,
          info: action.payload.info
        },
        formData: {
          alias: action.payload.alias,
          info: action.payload.info
        }
      }
    case 'upload_data':
      return {
        ...state,
        data: {
          alias: state.formData.alias,
          info: state.formData.info
        }
      }
    case 'change_formData_alias':
      return {
        ...state,
        formData: {
          ...state.formData,
          alias: action.payload.alias
        }
      }
    case 'change_formData_info':
      return {
        ...state,
        formData: {
          ...state.formData,
          info: action.payload.info
        }
      }
    case 'toggle_visible_alias_input':
      return {
        ...state,
        visibleInput: {
          ...state.visibleInput,
          alias: !state.visibleInput.alias
        }
      }
    case 'toggle_visible_alias_emoji':
      return {
        ...state,
        visibleEmoji: {
          alias: !state.visibleEmoji.alias,
          info: false
        }
      }
    case 'toggle_visible_info_input':
      return {
        ...state,
        visibleInput: {
          ...state.visibleInput,
          info: !state.visibleInput.info
        }
      }
    case 'toggle_visible_info_emoji':
      return {
        ...state,
        visibleEmoji: {
          alias: false,
          info: !state.visibleEmoji.info
        }
      }
    case 'print_emoji_alias': {
      return {
        ...state,
        formData: {
          ...state.formData,
          alias: state.formData.alias + action.payload.emojiObject.emoji
        }
      }
    }
    case 'print_emoji_info': {
      return {
        ...state,
        formData: {
          ...state.formData,
          info: state.formData.info + action.payload.emojiObject.emoji
        }
      }
    }
    case 'close_inputs': {
      return {
        ...state,
        visibleInput: {
          alias: false,
          info: false
        },
        visibleEmoji: {
          alias: false,
          info: false
        }
      }
    }
  }
}
