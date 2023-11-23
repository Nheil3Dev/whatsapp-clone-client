import { useDelay } from '../../hooks/useDelay'
import { WhatsappIcon } from '../lib/icons/WhatsappIcon'
import './Loading.css'

export function Loading () {
  const { delay } = useDelay(3000, null)

  if (delay) return
  return (
    <div className="loading">
      <span>
        <WhatsappIcon />
      </span>
      <p>Cargando chats...</p>
      <div className='loading-bar-container'>
        <span className='loading-bar'></span>
      </div>
    </div>
  )
}
