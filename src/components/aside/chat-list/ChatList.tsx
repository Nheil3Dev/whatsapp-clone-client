import { useState } from 'react'
import { socket } from '../../../hooks/useSocketIo'
import { Dialog } from '../../dialog/Dialog'
import { FilterIcon } from '../../icons/FilterIcon'
import { MenuIcon } from '../../icons/MenuIcon'
import { NewChatIcon } from '../../icons/NewChatIcon'
import { Search } from '../../search/Search'
import { ChatItem } from './ChatItem'
import './ChatList.css'

interface ChatListProps {
  setVisibleProfile: (prop: boolean) => void;
  setVisibleNewChat: (prop: boolean) => void
}

export function ChatList ({ setVisibleProfile, setVisibleNewChat }: ChatListProps) {
  const [activeDialog, setActiveDialog] = useState(false)
  return (
    <section className="principal-aside">
      <header className="chat-list-header">
        <img
          onClick={() => setVisibleProfile(true)}
          className="img"
          src="random-img.jpg"
          alt="Foto de perfil de usuario"
        />
        <div className='icon-container-header-aside'>
          <button className='icon-button' title='Nuevo chat' onClick={() => setVisibleNewChat(true)}>
            <NewChatIcon />
          </button>
          <button className='icon-button' title='Menú' onClick={(e) => {
            e.stopPropagation()
            setActiveDialog(!activeDialog)
          } }>
            <MenuIcon />
          </button>
          <Dialog isOpen={activeDialog} onClose={setActiveDialog}>
            <p onClick={() => setVisibleNewChat(true)}>Nuevo mensaje</p>
            <p onClick={() => alert('Nuevo grupo')}>Nuevo grupo</p>
            <p onClick={() => socket.disconnect() }>Cerrar sesión</p>
          </Dialog>
        </div>
      </header>
      <section className="chat-list-container">
        <div className='chat-list-filter'>
          <Search placeholder='Busca un chat' />
          <button className="icon-button" title="Filtro de chats no leídos">
            <FilterIcon />
          </button>
        </div>
        <ul className="chat-list">
          <ChatItem isSelected />
          <ChatItem />
        </ul>
      </section>
    </section>
  )
}
