import { RegisterActions } from '../reducers/registerReducer'

export const changeAlias = (alias: string): RegisterActions => {
  return {
    type: 'change_alias',
    payload: { alias }
  }
}

export const changeEmail = (email: string): RegisterActions => {
  return {
    type: 'change_email',
    payload: { email }
  }
}

export const changePassword = (password: string): RegisterActions => {
  return {
    type: 'change_password',
    payload: { password }
  }
}

export const changeConfirm = (confirm: string): RegisterActions => {
  return {
    type: 'change_confirm',
    payload: { confirm }
  }
}

export const changeError = (error: string): RegisterActions => {
  return {
    type: 'change_error',
    payload: { error }
  }
}
