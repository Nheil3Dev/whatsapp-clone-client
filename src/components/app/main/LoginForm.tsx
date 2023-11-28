import { useContext } from 'react'
import { SocketContext } from '../../../context/socketContext'
import { useDelay } from '../../../hooks/useDelay'
import { useLogin } from '../../../hooks/useLogin'
import './LoginForm.css'

interface LoginFormProps {
  initial: { registerActived: boolean, initialValues: { email: string, password: string }}
  setInitial: (prop: { registerActived: boolean, initialValues: { email: string, password: string }}) => void
}

export function LoginForm ({ setInitial, initial }: LoginFormProps) {
  const { socket } = useContext(SocketContext)
  const { auth, handleChangeEmail, handleChangePassword, handleSubmit, test } = useLogin(socket, initial.initialValues)
  const { delay } = useDelay(10000, '')
  return (
    <div className='login-container'>
      <h1>Inicio</h1>
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
            Contraseña
          </label>
        </div>
        <div className='login-form-buttons-container'>
          <button type='submit'>Entrar</button>
          <button type='button' onClick={test}>Probar</button>
        </div>
      </form>
      <div className='login-form-register'>
        <p>Regístrate <span onClick={() => setInitial({ registerActived: true, initialValues: { email: '', password: '' } })}>aquí</span></p>
      </div>
      {auth.error && <div className='login-error'>{auth.error}</div>}
      {initial.initialValues.email.length !== 0 && !delay && <div className='sucesful-user'>Usuario creado con éxito</div> }
    </div>
  )
}
