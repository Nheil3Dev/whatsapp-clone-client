import { useSocketIo } from '../../../hooks/useSocketIo'
import { getDate } from '../../../utils/getDate'
import { ArrowDownIcon } from '../../icons/ArrowDownIcon'
import './ChatItem.css'

interface ChatItemProps {
  isSelected?: boolean
}

export function ChatItem ({ isSelected }: ChatItemProps) {
  const className = isSelected ? 'chat-item selected' : 'chat-item'
  const { lastMsg } = useSocketIo()
  // Aqui deberia recoger el usuario de algún sitio
  const username = lastMsg?.user === 'Claudio' ? 'Tú' : lastMsg?.user
  // Habria que implementar otro con el socket para que se fuese actualizando
  return (
    <li className={className}>
      <img className="img" src="foto_grupo.jpg" alt="Foto de grupo" />
      <div>
        <div className='title-chat-container'>
          <h3 className="title-chat-list" title='Al cielo con ella'>¡Al cielo con ella!</h3>
          <span className='chat-list-time'>{getDate(new Date(lastMsg?.date))}</span>
        </div>
        <div className='last-msg-container'>
          <p>{username}: {lastMsg?.content}</p>
          <button className='icon-button'><ArrowDownIcon /></button>
        </div>
      </div>
    </li>
  )
}
