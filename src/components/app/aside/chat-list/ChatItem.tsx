import { useContext } from 'react'
import { USER } from '../../../../constants/user'
import { ChatContext } from '../../../../context/chatContext'
import { MainContext } from '../../../../context/mainContext'
import { useDropdown } from '../../../../hooks/useDropDown'
import { useSocketIo } from '../../../../hooks/useSocketIo'
import { IChat } from '../../../../types/types'
import { getDate } from '../../../../utils/getDate'
import { UserDefaultAvatar } from '../../../lib/defaults-avatars/UserDefaultAvatar'
import { ArrowDownIcon } from '../../../lib/icons/ArrowDownIcon'
import './ChatItem.css'

interface ChatItemProps {
  chat: IChat
}

export function ChatItem ({ chat }: ChatItemProps) {
  const { activeChat, setActiveChat } = useContext(ChatContext)
  const { closeContain } = useContext(MainContext)
  const { lastMsg } = useSocketIo()
  const { dropdownOpened, dropdownRef, closeDropdown, openDropdown } = useDropdown()
  const className = activeChat === chat.id ? 'chat-item selected' : 'chat-item'

  const username = lastMsg?.user === USER.alias ? 'Tú' : lastMsg?.user
  // Habria que implementar otro con el socket para que se fuese actualizando
  return (
    <li className={className} onClick={() => {
      setActiveChat(chat.id)
      closeContain()
    }}>
      {chat.admin
        ? <img className="img" src="foto_grupo.jpg" alt="Foto de grupo" />
        : <span className='img'><UserDefaultAvatar /></span>
      }
      <div>
        <div className='title-chat-container'>
          <h3 className="title-chat-list text-ellipsis" title={chat.name}>{chat.name}</h3>
          <span className='chat-list-time'>{getDate(new Date(lastMsg?.date), 'lastMsg')}</span>
        </div>
        <div className='last-msg-container'>
          <p className='text-ellipsis'>{username}: {lastMsg?.content}</p>
          <button className='icon-button' onClick={dropdownRef.current ? closeDropdown : openDropdown}><ArrowDownIcon /></button>
          {dropdownOpened &&
          <div ref={dropdownRef} className='drop-down'>
            <p>Eliminar chat</p>
            <p>Marcar como leído</p>
            <p>Fijar chat</p>
          </div>}
        </div>
      </div>
    </li>
  )
}
