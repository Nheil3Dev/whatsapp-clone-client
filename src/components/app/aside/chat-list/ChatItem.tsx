import { useContext, useState } from 'react'
import { ChatContext } from '../../../../context/chatContext'
import { MainContext } from '../../../../context/mainContext'
import { UserContext } from '../../../../context/userContext'
import { useDropdown } from '../../../../hooks/useDropDown'
import { IChat } from '../../../../types/types'
import { getDate } from '../../../../utils/getDate'
import { UserDefaultAvatar } from '../../../lib/defaults-avatars/UserDefaultAvatar'
import { ArrowDownIcon } from '../../../lib/icons/ArrowDownIcon'
import './ChatItem.css'

interface ChatItemProps {
  chat: IChat
}

export function ChatItem ({ chat }: ChatItemProps) {
  const { user } = useContext(UserContext)
  const { activeChat, setActiveChat } = useContext(ChatContext)
  const { closeContain } = useContext(MainContext)
  const { dropdownOpened, dropdownRef, closeDropdown, openDropdown } = useDropdown()
  const [clicked, setClicked] = useState(false)
  const className = activeChat === chat.id ? 'chat-item selected' : 'chat-item'
  let username

  // Para que no pete si creamos un chat nuevo
  if (chat.messages) {
    username = chat.messages[chat.messages.length - 1]?.alias === user?.alias ? 'Tú' : chat.messages[chat.messages.length - 1]?.alias
  }

  return (
    <li className={className} onClick={(e) => {
      // Comprueba que el click ha sido en el svg y se lo salta, devuelve true para que se propague hasta window
      if (e.target instanceof SVGElement) return true
      setActiveChat(chat.id)
      closeContain()
    }}>
      {chat.admin
        ? <img className="img" src="foto_grupo.jpg" alt="Foto de grupo" />
        : <span className='img'>
            <UserDefaultAvatar />
          </span>
      }
      <div className='info-chat-container'>
        <div className='title-chat-container'>
          <h3
            className="title-chat-list text-ellipsis"
            title={chat.name}
          >
            {chat.name}
          </h3>
          <span className='chat-list-time'>
            {chat.messages?.length > 0 ? getDate(new Date(chat.messages[chat.messages.length - 1]?.date), 'lastMsg') : ''}
          </span>
        </div>
        <div className='last-msg-container'>
          <p className='text-ellipsis'>
            {chat.messages?.length > 0 ? `${username}: ${chat.messages[chat.messages.length - 1]?.content}` : 'Sin mensajes'}
          </p>
          <button
            className='icon-button'
            onClick={() => {
              if (!clicked) {
                setClicked(true)
                openDropdown()
              } else if (!dropdownOpened && clicked) {
                setClicked(false)
                closeDropdown()
              }
            }}
          >
            <ArrowDownIcon />
          </button>
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
