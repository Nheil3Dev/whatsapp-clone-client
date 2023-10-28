import { ChangeEvent, createContext, JSX, useContext, useEffect, useState } from 'react'
import { IDataForm } from '../types/types'
import { ChatContext } from './chatContext'

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
  const { chat, setChat } = useContext(ChatContext)
  const [formData, setFormData] = useState<IDataForm>({
    name: '',
    info: ''
  })
  const [visibleInput, setVisibleInput] = useState({
    name: false,
    info: false
  })
  const handleClickName = () => setVisibleInput({ ...visibleInput, name: !visibleInput.name })
  const handleClickInfo = () => setVisibleInput({ ...visibleInput, info: !visibleInput.info })

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      name: e.target.value
    })
  }
  const handleChangeInfo = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      info: e.target.value
    })
  }

  const uploadGroupData = () => {
    if (chat?.name === formData.name && chat?.info === formData.info) return
    return fetch(`http://localhost:1234/api/group/${chat?.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(res => {
        if (res.rowsAffected === 1 && chat) {
          const newChat = { ...chat, ...formData }
          setChat && setChat(newChat)
        }
      })
  }

  useEffect(() => {
    const newDataForm = {
      name: chat?.name ?? '',
      info: chat?.info ?? ''
    }
    setFormData(newDataForm)
  }, [chat])
  return (
    <ChatInfoContext.Provider value={{ formData, uploadGroupData, handleChangeInfo, handleChangeName, handleClickName, handleClickInfo, visibleInput }}>
      {children}
    </ChatInfoContext.Provider>
  )
}
