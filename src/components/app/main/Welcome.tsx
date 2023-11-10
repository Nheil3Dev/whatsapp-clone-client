import { useContext } from 'react'
import { SocketContext } from '../../../context/socketContext'
import './Welcome.css'

export function Welcome () {
  const { socket } = useContext(SocketContext)

  if (!socket) return null
  return (
      <div className="welcome-container">
        <div className='login-container'>
          <h1>Log in</h1>
          <form className='login-form'>
            <div className='input-container'>
              <input id="email" type="email" autoComplete='none' />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-container">
              <input id="password" type="password" />
              <label htmlFor="password">Password</label>
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
