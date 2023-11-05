import { useContext } from 'react'
import { SocketContext } from '../../../context/socketContext'
import './Welcome.css'

export function Welcome () {
  const { socket } = useContext(SocketContext)

  if (!socket) return null
  return (
    <div className="welcome-container">
      <button onClick={() => socket.connect()}>Iniciar sesión</button>
    </div>
  )
}
