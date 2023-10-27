import { ChangeEventHandler, FormEventHandler, useEffect, useState } from 'react'
import { IUser } from '../types/types'

const USER = 'cd89bf8f-e422-47f5-867d-2567caf3e476'

export function useUser (isVisible: boolean) {
  const [data, setData] = useState<IUser>({
    alias: '',
    info: ''
  })
  const [formData, setFormData] = useState<IUser>({
    alias: '',
    info: ''
  })
  const [visibleInput, setVisibleInput] = useState({
    alias: false,
    info: false
  })

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    // Comprueba que no se ha cambiado el valor
    if (data.alias === formData.alias && data?.info === formData.info) return true
    // Si se modifica el registro de la BD devuelve true y actualiza la interfaz
    return fetch(`http://localhost:1234/api/user/${USER}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(res => {
        if (res.rowsAffected === 1) {
          setData(formData)
          return true
        }
        return false
      })
  }

  const handleVisibleAlias = () => {
    setVisibleInput({ ...visibleInput, alias: !visibleInput.alias })
  }
  const handleVisibleInfo = () => {
    setVisibleInput({ ...visibleInput, info: !visibleInput.info })
  }
  const onChangeAlias: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData({ ...formData, alias: e.target.value })
  }
  const onChangeInfo: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData({ ...formData, info: e.target.value })
  }
  useEffect(() => {
    fetch(`http://localhost:1234/api/user/${USER}`)
      .then(res => res.json())
      .then(data => {
        setData(data[0])
        setFormData(data[0])
      })
  }, [])
  const className = isVisible ? 'secondary-aside visible-profile' : 'secondary-aside'
  return {
    data,
    formData,
    onChangeAlias,
    onChangeInfo,
    className,
    handleVisibleAlias,
    handleVisibleInfo,
    visibleInput,
    handleSubmit
  }
}
