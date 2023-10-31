export interface InfoChatState {
  formData: {
    name: string,
    info: string
  },
  visibleInput: {
    name: boolean,
    info: boolean
  }
}

export type InfoChatAction =
  | { type: 'toggle_show_name_input' }
  | { type: 'toggle_show_info_input' }
  | { type: 'change_name_value'; payload: { name: string } }
  | { type: 'change_info_value'; payload: { info: string } }
  | { type: 'charge_initial_value'; payload: { name: string; info: string } }
  | { type: 'close_all' };

export const infoChatInitialState: InfoChatState = {
  formData: {
    name: '',
    info: ''
  },
  visibleInput: {
    name: false,
    info: false
  }
}

export const infoChatReducer = (state: InfoChatState = infoChatInitialState, action: InfoChatAction) => {
  const { type } = action

  switch (type) {
    case 'toggle_show_name_input':
      return {
        ...state,
        visibleInput: {
          ...state.visibleInput,
          name: !state.visibleInput.name
        }
      }
    case 'toggle_show_info_input':
      return {
        ...state,
        visibleInput: {
          ...state.visibleInput,
          info: !state.visibleInput.info
        }
      }
    case 'change_name_value':
      return {
        ...state,
        formData: {
          ...state.formData,
          name: action.payload.name
        }
      }
    case 'change_info_value':
      return {
        ...state,
        formData: {
          ...state.formData,
          info: action.payload.info
        }
      }
    case 'charge_initial_value':
      return {
        ...state,
        formData: {
          name: action.payload.name,
          info: action.payload.info
        }
      }
    case 'close_all':
      return {
        ...state,
        visibleInput: {
          name: false,
          info: false
        }
      }
  }
}
