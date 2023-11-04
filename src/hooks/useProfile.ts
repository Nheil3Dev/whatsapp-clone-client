import { Dispatch, FormEvent, useEffect } from 'react'
import { initUserInfo, uploadData } from '../actions/userInfoActions'
import { UserInfo, UserInfoAction } from '../reducers/userInfoReducer'
import { changeProfileData } from '../services/changeProfileData'
import { getProfileData } from '../services/getProfileData'

const USER = 'cd89bf8f-e422-47f5-867d-2567caf3e476'

export function useProfile (userInfoState: UserInfo | undefined, dispatchUserInfo: Dispatch<UserInfoAction> | undefined) {
  useEffect(() => {
    getProfileData(USER)
      .then(data => {
        dispatchUserInfo && dispatchUserInfo(initUserInfo(data))
      })
  }, [])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (!userInfoState || !dispatchUserInfo) return
    e.preventDefault()
    // Comprueba que no se ha cambiado el valor
    if (userInfoState.data.alias === userInfoState.formData.alias && userInfoState.data?.info === userInfoState.formData.info) return true
    // Si se modifica el registro de la BD devuelve true y actualiza la interfaz
    return changeProfileData(USER, userInfoState.formData)
      .then(res => {
        if (res.rowsAffected === 1) {
          dispatchUserInfo(uploadData)
          return true
        }
        return false
      })
  }
  return {
    handleSubmit
  }
}
