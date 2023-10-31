import { createContext, Dispatch, JSX } from 'react'
import { useInfoGroup } from '../hooks/useInfoGroup'
import { type InfoChatAction, type InfoChatState } from '../reducers/infoChatReducer'

interface IChatInfoContext {
  infoChatState: InfoChatState,
  dispatch: Dispatch<InfoChatAction>
  uploadGroupData: () => void | Promise<void>
}

export const ChatInfoContext = createContext<Partial<IChatInfoContext>>({})

export function ChatInfoProvider ({ children }: { children: JSX.Element[]}) {
  const { infoChatState, dispatch, uploadGroupData } = useInfoGroup()

  return (
    <ChatInfoContext.Provider value={{ infoChatState, dispatch, uploadGroupData }}>
      {children}
    </ChatInfoContext.Provider>
  )
}
