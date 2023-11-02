export interface AsideState {
  userInfo: boolean
  newChat: boolean
  newGroup: boolean
  confirm: boolean
}

export type AsideAction = {
  type: 'open_user_info'|'open_new_chat'|'open_new_group'|'open_confirm'|'close_user_info'|'close_new_chat'|'close_new_group'|'close_confirm'|'close_all'
}

export const asideInitialState: AsideState = {
  userInfo: false,
  newChat: false,
  newGroup: false,
  confirm: false
}

export const asideReducer = (state: AsideState = asideInitialState, action: AsideAction) => {
  const { type } = action

  switch (type) {
    case 'open_user_info':
      return {
        ...state,
        userInfo: true
      }

    case 'open_new_chat':
      return {
        ...state,
        newChat: true
      }

    case 'open_new_group':
      return {
        ...state,
        newGroup: true
      }
    case 'open_confirm':
      return {
        ...state,
        confirm: true
      }
    case 'close_user_info':
      return {
        ...state,
        userInfo: false
      }
    case 'close_new_chat':
      return {
        ...state,
        newChat: false
      }
    case 'close_new_group':
      return {
        ...state,
        newGroup: false
      }
    case 'close_confirm':
      return {
        ...state,
        confirm: false
      }
    case 'close_all': {
      return {
        userInfo: false,
        newChat: false,
        newGroup: false,
        confirm: false
      }
    }
  }
}
