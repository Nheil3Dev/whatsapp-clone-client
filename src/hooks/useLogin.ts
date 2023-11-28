import { FormEvent, useContext, useState } from 'react'
import { Socket } from 'socket.io-client'
import { UserContext } from '../context/userContext'
import { login } from '../services/login'

export function useLogin (socket: Socket | undefined, initialValues: { email: string, password: string }) {
  const { saveUser } = useContext(UserContext)
  const [auth, setAuth] = useState({
    email: initialValues.email,
    password: initialValues.password,
    error: ''
  })

  const handleChangeEmail = (email: string) => {
    const newAuth = {
      ...auth,
      email,
      error: ''
    }
    setAuth(newAuth)
  }

  const handleChangePassword = (password: string) => {
    const newAuth = {
      ...auth,
      password,
      error: ''
    }
    setAuth(newAuth)
  }

  const test = async () => {
    const user = {
      email: 'usuario_prueba@meloinvento.com',
      password: '123456'
    }
    const response = await login(user)
    saveUser(response.user.id, response.user.alias)
    socket?.connect()
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const response = await login(auth)

    if (response.email && response.password) {
      const { user } = response
      saveUser(user.id, user.alias)
      socket?.connect()
    } else if (!response.email) {
      setAuth({
        ...auth,
        error: 'Email incorrecto'
      })
    } else {
      setAuth({
        ...auth,
        error: 'Contraseña incorrecta'
      })
    }
  }

  return { auth, handleChangeEmail, handleChangePassword, handleSubmit, test }
}
