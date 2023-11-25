import { IUser } from '../types/types'

export interface AsideRightState {
  aside: boolean
  infoChat: boolean
  infoUser: boolean
  search: boolean
  user: IUser
}

export const asideRightInitialState = {
  aside: false,
  infoChat: false,
  infoUser: false,
  search: false,
  user: {} as IUser
}

export type AsideRightActions =
| { type: 'open_info' }
| { type: 'open_search' }
| { type: 'open_info_user', payload: { user: IUser} }
| { type: 'close_info_user' }
| { type: 'close_aside' }
| { type: 'close_contain' }

export const asideRightReducer = (state: AsideRightState = asideRightInitialState, action: AsideRightActions): AsideRightState => {
  const { type } = action

  switch (type) {
    case 'open_info':
      return {
        aside: true,
        infoChat: true,
        infoUser: false,
        search: false,
        user: {} as IUser
      }
    case 'open_search':
      return {
        aside: true,
        infoChat: false,
        infoUser: false,
        search: true,
        user: {} as IUser
      }
    case 'open_info_user':
      return {
        ...state,
        infoUser: true,
        user: action.payload.user
      }
    case 'close_info_user':
      return {
        ...state,
        infoUser: false,
        user: {} as IUser
      }
    case 'close_aside':
      return {
        ...state,
        aside: false
      }
    case 'close_contain':
      return {
        ...state,
        aside: false,
        infoChat: false,
        infoUser: false,
        search: false
      }
  }
}
