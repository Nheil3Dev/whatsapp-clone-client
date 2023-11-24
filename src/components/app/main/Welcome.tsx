import { useContext } from 'react'
import { SocketContext } from '../../../context/socketContext'
import { useLogin } from '../../../hooks/useLogin'
import './Welcome.css'

export function Welcome () {
  const { socket } = useContext(SocketContext)
  const { auth, handleChangeEmail, handleChangePassword, handleSubmit, test } = useLogin(socket)
  return (
      <div className="welcome-container">
        <div className='login-container'>
          <h1>Log in</h1>
          <form className='login-form' onSubmit={(e) => handleSubmit(e)}>
            <div className='input-container'>
              <input
                id="email"
                type="email"
                autoComplete='none'
                value={auth.email}
                onChange={(e) => handleChangeEmail(e.target.value)}
                required
              />
              <label
                className={auth.email.length > 0 ? 'activated-input' : ''}
                htmlFor="email"
              >
                Email
              </label>
            </div>
            <div className="input-container">
              <input
                id="password"
                type="password"
                value={auth.password}
                onChange={(e) => handleChangePassword(e.target.value)}
                required
              />
              <label
                className={auth.password.length > 0 ? 'activated-input' : ''}
                htmlFor="password"
              >
                Password
              </label>
              {auth.error && <div className='login-error'>{auth.error}</div>}
            </div>
            <div className='login-form-buttons-container'>
              <button type='submit'>Entrar</button>
              <button type='button' onClick={test}>Probar</button>
            </div>
          </form>
        </div>
      </div>
  )
}
