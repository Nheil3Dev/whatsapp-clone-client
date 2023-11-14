import { useContext, useState } from 'react'
import { SocketContext } from '../../../context/socketContext'
import './Welcome.css'

export function Welcome () {
  const { socket } = useContext(SocketContext)
  const [auth, setAuth] = useState({
    email: '',
    password: ''
  })

  const handleChangeEmail = (email: string) => {
    const newAuth = {
      ...auth,
      email
    }
    setAuth(newAuth)
  }

  const handleChangePassword = (password: string) => {
    const newAuth = {
      ...auth,
      password
    }
    setAuth(newAuth)
  }

  if (!socket) return null
  return (
      <div className="welcome-container">
        <div className='login-container'>
          <h1>Log in</h1>
          <form className='login-form' onSubmit={(e) => e.preventDefault()}>
            <div className='input-container'>
              <input id="email" type="email" autoComplete='none' value={auth.email} onChange={(e) => handleChangeEmail(e.target.value)} />
              <label className={auth.email.length > 0 ? 'activated-input' : ''} htmlFor="email">Email</label>
            </div>
            <div className="input-container">
              <input id="password" type="password" value={auth.password} onChange={(e) => handleChangePassword(e.target.value)} />
              <label className={auth.password.length > 0 ? 'activated-input' : ''} htmlFor="password">Password</label>
            </div>
            <div className='login-form-buttons-container'>
              <button type='submit'>Entrar</button>
              <button type='button' onClick={() => socket.connect()}>Probar</button>
            </div>
          </form>
        </div>
      </div>
  )
}
