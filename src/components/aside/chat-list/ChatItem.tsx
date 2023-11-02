import { useContext } from 'react'
import { ChatContext } from '../../../context/chatContext'
import { MainContext } from '../../../context/mainContext'
import { useSocketIo } from '../../../hooks/useSocketIo'
import { IChat } from '../../../types/types'
import { getDate } from '../../../utils/getDate'
import { UserDefaultAvatar } from '../../defaults-avatars/UserDefaultAvatar'
import { ArrowDownIcon } from '../../icons/ArrowDownIcon'
import './ChatItem.css'

interface ChatItemProps {
  chat: IChat
}

export function ChatItem ({ chat }: ChatItemProps) {
  const { activeChat, setActiveChat } = useContext(ChatContext)
  const className = activeChat === chat.id ? 'chat-item selected' : 'chat-item'
  const { closeContain } = useContext(MainContext)
  const { lastMsg } = useSocketIo()
  // Aqui deberia recoger el usuario de algún sitio
  const username = lastMsg?.user === 'Claudio' ? 'Tú' : lastMsg?.user
  // Habria que implementar otro con el socket para que se fuese actualizando
  return (
    <li className={className} onClick={() => {
      setActiveChat && setActiveChat(chat.id)
      closeContain && closeContain()
    }}>
      {chat.admin
        ? <img className="img" src="foto_grupo.jpg" alt="Foto de grupo" />
        : <span className='img'><UserDefaultAvatar /></span>
      }
      <div>
        <div className='title-chat-container'>
          <h3 className="title-chat-list" title={chat.name}>{chat.name}</h3>
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
