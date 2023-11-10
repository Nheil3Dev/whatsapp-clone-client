import { LOCALSTORAGE } from '../constants/localStorage'

export const getUser = async () => {
  const userId = await window.localStorage.getItem(LOCALSTORAGE.ID)
  const userName = await window.localStorage.getItem(LOCALSTORAGE.ALIAS)
  if (userId && userName) {
    return {
      id: userId,
      alias: userName
    }
  }
  // TODO: tengo que crear un usuario invitado y ponerlo aqui
  return {
    id: '3a477c32-9b41-4d7c-8cd6-dc3de056c5ec',
    alias: 'Valeria'
  }
}
