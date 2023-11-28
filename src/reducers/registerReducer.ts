export interface RegisterState {
  alias: string
  email: string
  password: string
  confirm: string
  error: string
}

export const registerInitialState = {
  alias: '',
  email: '',
  password: '',
  confirm: '',
  error: ''
}

export type RegisterActions =
| { type: 'change_alias', payload: { alias : string } }
| { type: 'change_email', payload: { email: string } }
| { type: 'change_password', payload: { password: string } }
| { type: 'change_confirm', payload: { confirm: string } }
| { type: 'change_error', payload: { error: string } }

export const registerReducer = (state: RegisterState = registerInitialState, action: RegisterActions) => {
  const { type } = action

  switch (type) {
    case 'change_alias':
      return {
        ...state,
        alias: action.payload.alias,
        error: ''
      }

    case 'change_email':
      return {
        ...state,
        email: action.payload.email,
        error: ''
      }

    case 'change_password':
      return {
        ...state,
        password: action.payload.password,
        error: ''
      }

    case 'change_confirm':
      return {
        ...state,
        confirm: action.payload.confirm,
        error: ''
      }

    case 'change_error':
      return {
        ...state,
        error: action.payload.error
      }
  }
}
