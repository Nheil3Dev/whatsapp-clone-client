import { useEffect, useState } from 'react'
import { IMessage } from '../../types/types'
import { ArrowDownIcon } from '../icons/ArrowDownIcon'

interface ChatItemProps {
  isSelected?: boolean
}

export function ChatItem ({ isSelected }: ChatItemProps) {
  const className = isSelected ? 'chat-item selected' : 'chat-item'
  const [lastMsg, setLastMsg] = useState<IMessage>()
  useEffect(() => {
    // en un futuro cambiarlo para pasarle el nombre del chat
    fetch('http://localhost:1234/api/lastMsg')
      .then(res => res.json())
      .then(msg => setLastMsg(msg))
  }, [])

  // Habria que implementar otro con el socket para que se fuese actualizando

  return (
    <li className={className}>
      <img className="img" src="foto_grupo.jpg" alt="Foto de grupo" />
      <div>
        <h3 className="title-chat-list">¡Al cielo con ella!</h3>
        <div className='last-msg-container'>
          <p>{lastMsg?.user}: {lastMsg?.content}</p>
          <button className='form-button'><ArrowDownIcon /></button>
        </div>
      </div>
    </li>
  )
}
