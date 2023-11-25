import { AsideRightActions } from '../reducers/asideRightReducer'
import { IUser } from '../types/types'

export const openInfo: AsideRightActions = { type: 'open_info' }

export const openSearch: AsideRightActions = { type: 'open_search' }

export const openInfoUser = (user: IUser): AsideRightActions => {
  return {
    type: 'open_info_user',
    payload: { user }
  }
}

export const closeAside: AsideRightActions = { type: 'close_aside' }

export const closeInfoUser: AsideRightActions = { type: 'close_info_user' }

export const closeContain: AsideRightActions = { type: 'close_contain' }
