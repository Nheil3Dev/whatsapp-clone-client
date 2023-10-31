import { AsideAction } from '../reducers/asideReducer'

export const openProfile: AsideAction = { type: 'open_user_info' }

export const closeProfile: AsideAction = { type: 'close_user_info' }

export const openNewChat: AsideAction = { type: 'open_new_chat' }

export const closeNewChat: AsideAction = { type: 'close_new_chat' }

export const openNewGroup: AsideAction = { type: 'open_new_group' }

export const closeNewGroup: AsideAction = { type: 'close_new_group' }
