import { useContext } from 'react'
import { selectChat } from '../../../../actions/chatActions'
import { ChatContext } from '../../../../context/chatContext'
import { MainContext } from '../../../../context/mainContext'
import { UserContext } from '../../../../context/userContext'
import { useDropdown } from '../../../../hooks/useDropDown'
import { IChat } from '../../../../types/types'
import { getDate } from '../../../../utils/getDate'
import { Dropdown } from '../../../lib/dialog/Dropdown'
import { ArrowDownIcon } from '../../../lib/icons/ArrowDownIcon'
import { ChatImg } from '../../../lib/image/ChatImg'
import './ChatItem.css'
import { ChatItemDropdown } from './ChatItemDropdown'

interface ChatItemProps {
  chat: IChat
}

export function ChatItem ({ chat }: ChatItemProps) {
  const { user } = useContext(UserContext)
  const { chatState, dispatchChat } = useContext(ChatContext)
  const { closeContain } = useContext(MainContext)
  const { dropdownOpened, dropdownRef, toggleDropdown, buttonRef } = useDropdown()
  const className = chatState.activeChat === chat.id ? 'chat-item selected' : 'chat-item'
  let username

  // Para que no pete si creamos un chat nuevo
  if (chat.messages) {
    username = chat.messages[chat.messages.length - 1]?.alias === user?.alias ? 'Tú' : chat.messages[chat.messages.length - 1]?.alias
  }

  return (
    <li className={className} onClick={(e) => {
      // Comprueba que el click ha sido en el svg y se lo salta, devuelve true para que se propague hasta window
      if (e.target instanceof SVGElement) return true
      dispatchChat(selectChat(chat.id))
      closeContain()
    }}>
      <ChatImg className='img' chat={chat} />
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
            ref={buttonRef}
            className='icon-button'
            onClick={toggleDropdown}
          >
            <ArrowDownIcon />
          </button>
          {dropdownOpened &&
          <Dropdown ref={dropdownRef}>
            <ChatItemDropdown chat={chat} />
          </Dropdown>}
        </div>
      </div>
    </li>
  )
}
