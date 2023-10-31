export interface AsideState {
  userInfo: boolean
  newChat: boolean
  newGroup: boolean
}

export type AsideAction = {
  type: 'open_user_info'|'open_new_chat'|'open_new_group'|'close_user_info'|'close_new_chat'|'close_new_group'
}

export const asideInitialState: AsideState = {
  userInfo: false,
  newChat: false,
  newGroup: false
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
  }
}
