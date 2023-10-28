import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { ChatContext } from '../context/chatContext'
import { IDataForm } from '../types/types'

export function useInfoGroup () {
  /* STATES */

  const { chat, setChat } = useContext(ChatContext)
  const [formData, setFormData] = useState<IDataForm>({
    name: '',
    info: ''
  })
  const [visibleInput, setVisibleInput] = useState({
    name: false,
    info: false
  })

  /* FUNCTIONS */

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

  /* SERVICES */

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

  /* EFFECTS */

  useEffect(() => {
    const newDataForm = {
      name: chat?.name ?? '',
      info: chat?.info ?? ''
    }
    setFormData(newDataForm)
  }, [chat])

  return {
    formData,
    uploadGroupData,
    handleChangeInfo,
    handleChangeName,
    handleClickName,
    handleClickInfo,
    visibleInput
  }
}
