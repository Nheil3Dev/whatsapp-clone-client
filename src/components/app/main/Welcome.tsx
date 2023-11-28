import { useState } from 'react'
import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'
import './Welcome.css'

export function Welcome () {
  const [initial, setInitial] = useState({
    registerActived: false,
    initialValues: {
      email: '',
      password: ''
    }
  })
  return (
      <div className="welcome-container">
        {!initial.registerActived && <LoginForm setInitial={setInitial} initial={initial} />}
        {initial.registerActived && <RegisterForm setInitial={setInitial} />}
      </div>
  )
}
