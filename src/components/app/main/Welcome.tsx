import { useContext } from 'react'
import { SocketContext } from '../../../context/socketContext'
import './Welcome.css'

export function Welcome () {
  const { socket } = useContext(SocketContext)

  if (!socket) return null
  return (
    <div className="welcome-container">
      <h1>Whatsapp Web Clone</h1>
      <p>
        This is a clone of whatsapp web app. I built it for enterteinament and
        education.
      </p>
      <p>
        Visit my repo -{' '}
        <a target="blank" href="https://github.com/Nheil3Dev">
          Nheil3Dev
        </a>
      </p>
      <button onClick={() => socket.connect()}>Entrar en la aplicación</button>
    </div>
  )
}
