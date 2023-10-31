import { Dispatch, JSX, createContext, useReducer } from 'react'
import { AsideAction, AsideState, asideInitialState, asideReducer } from '../reducers/asideReducer'

interface IAsideContext {
  asideState: AsideState
  dispatch: Dispatch<AsideAction>
}

export const AsideContext = createContext<Partial<IAsideContext>>({})

export function AsideProvider ({ children }: { children: JSX.Element}) {
  const [asideState, dispatch] = useReducer(asideReducer, asideInitialState)

  return (
    <AsideContext.Provider value={{ asideState, dispatch }}>
      {children}
    </AsideContext.Provider>
  )
}
