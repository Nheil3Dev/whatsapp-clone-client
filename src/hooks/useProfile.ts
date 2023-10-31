import { ChangeEventHandler, FormEvent, useEffect, useState } from 'react'
import { changeProfileData } from '../services/changeProfileData'
import { getProfileData } from '../services/getProfileData'
import { IUser } from '../types/types'

const USER = 'cd89bf8f-e422-47f5-867d-2567caf3e476'

export function useProfile () {
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Comprueba que no se ha cambiado el valor
    if (data.alias === formData.alias && data?.info === formData.info) return true
    // Si se modifica el registro de la BD devuelve true y actualiza la interfaz
    return changeProfileData(USER, formData)
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
    getProfileData(USER)
      .then(data => {
        setData(data[0])
        setFormData(data[0])
      })
  }, [])
  return {
    data,
    formData,
    onChangeAlias,
    onChangeInfo,
    handleVisibleAlias,
    handleVisibleInfo,
    visibleInput,
    handleSubmit
  }
}
