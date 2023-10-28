import { ChangeEvent, createContext, JSX } from 'react'
import { useInfoGroup } from '../hooks/useInfoGroup'
import { IDataForm } from '../types/types'

interface IChatInfoContext {
  formData: IDataForm
  handleChangeName: (prop: ChangeEvent<HTMLInputElement>) => void
  handleChangeInfo: (prop: ChangeEvent<HTMLInputElement>) => void
  handleClickName: () => void
  handleClickInfo: () => void
  uploadGroupData: () => void | Promise<void>
  visibleInput: { name: boolean, info: boolean }
}

export const ChatInfoContext = createContext<Partial<IChatInfoContext>>({})

export function ChatInfoProvider ({ children }: { children: JSX.Element[]}) {
  const { formData, uploadGroupData, handleChangeInfo, handleChangeName, handleClickName, handleClickInfo, visibleInput } = useInfoGroup()

  return (
    <ChatInfoContext.Provider value={{ formData, uploadGroupData, handleChangeInfo, handleChangeName, handleClickName, handleClickInfo, visibleInput }}>
      {children}
    </ChatInfoContext.Provider>
  )
}
