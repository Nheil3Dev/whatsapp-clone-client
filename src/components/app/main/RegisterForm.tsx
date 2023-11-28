import { Reducer, useReducer } from 'react'
import { changeAlias, changeConfirm, changeEmail, changeError, changePassword } from '../../../actions/registerActions'
import { RegisterActions, RegisterState, registerInitialState, registerReducer } from '../../../reducers/registerReducer'
import { register } from '../../../services/register'

interface RegisterFormProps {
  setInitial: (prop: { registerActived: boolean, initialValues: { email: string, password: string }}) => void
}

export function RegisterForm ({ setInitial }: RegisterFormProps) {
  const [registerState, dispatchRegister] = useReducer<Reducer<RegisterState, RegisterActions>>(registerReducer, registerInitialState)

  return (
    <div className='login-container'>
    <h1>Registro</h1>
    <form className='login-form' onSubmit={async (e) => {
      e.preventDefault()

      if (registerState.password !== registerState.confirm) {
        return dispatchRegister(changeError('Las contraseñas no coinciden'))
      }

      const isRegistered = await register(registerState.alias, registerState.email, registerState.password)

      if (isRegistered) {
        setInitial({
          registerActived: false,
          initialValues: {
            email: registerState.email,
            password: registerState.password
          }
        })
      } else {
        dispatchRegister(changeError('Ya existe un usuario con este email'))
      }
    }}>
      <div className='input-container'>
        <input
          id="alias"
          type="text"
          autoComplete='none'
          value={registerState.alias}
          onChange={(e) => dispatchRegister(changeAlias(e.target.value))}
          required
        />
        <label
          className={registerState.alias.length > 0 ? 'activated-input' : ''}
          htmlFor="alias"
        >
          Alias
        </label>
      </div>
      <div className='input-container'>
        <input
          id="email"
          type="email"
          autoComplete='none'
          value={registerState.email}
          onChange={(e) => dispatchRegister(changeEmail(e.target.value))}
          required
        />
        <label
          className={registerState.email.length > 0 ? 'activated-input' : ''}
          htmlFor="email"
        >
          Email
        </label>
      </div>
      <div className="input-container">
        <input
          id="password"
          type="password"
          value={registerState.password}
          onChange={(e) => dispatchRegister(changePassword(e.target.value))}
          required
        />
        <label
          className={registerState.password.length > 0 ? 'activated-input' : ''}
          htmlFor="password"
        >
          Contraseña
        </label>
      </div>
      <div className='input-container'>
        <input
          id="confirm"
          type="password"
          autoComplete='none'
          value={registerState.confirm}
          onChange={(e) => dispatchRegister(changeConfirm(e.target.value))}
          required
        />
        <label
          className={registerState.confirm.length > 0 ? 'activated-input' : ''}
          htmlFor="confirm"
        >
          Confirmar contraseña
        </label>
      </div>
      <div className='login-form-buttons-container'>
        <button type='submit'>Registrar usuario</button>
      </div>
    </form>
      <div className='login-form-register'>
      <p><span onClick={() => setInitial({ registerActived: false, initialValues: { email: '', password: '' } })}>Volver atrás</span></p>
    </div>
    {registerState.error && <div className='login-error'>{registerState.error}</div>}
  </div>
  )
}
