import { JSX, Reducer, createContext, useReducer } from 'react'
import { useDialog } from '../hooks/useDialog'
import { AsideRightActions, AsideRightState, asideRightInitialState, asideRightReducer } from '../reducers/asideRightReducer'

interface IMainContext {
  asideRightState: AsideRightState
  dispatchAsideRight: (action: AsideRightActions) => void
  dialog: { isOpen: boolean, type: 'msg' | 'chat', confirm: () => void }
  openDialog: (type: 'msg' | 'chat', confirm: () => void) => void
  closeDialog: () => void
}

export const MainContext = createContext<IMainContext>({} as IMainContext)

export function MainProvider ({ children }: { children: JSX.Element[]}) {
  const [asideRightState, dispatchAsideRight] = useReducer<Reducer<AsideRightState, AsideRightActions>>(asideRightReducer, asideRightInitialState)
  const { dialog, closeDialog, openDialog } = useDialog()
  return (
    <MainContext.Provider value={{ asideRightState, dispatchAsideRight, dialog, openDialog, closeDialog }}>
      {children}
    </MainContext.Provider>
  )
}
