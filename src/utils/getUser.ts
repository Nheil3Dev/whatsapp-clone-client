import { LOCALSTORAGE } from '../constants/localStorage'

export const getUser = async () => {
  const localData = await window.localStorage.getItem(LOCALSTORAGE)

  if (localData) {
    return JSON.parse(localData)
  }
}
