import { useState } from 'react'
import { socket } from '../../../hooks/useSocketIo'
import { Dialog } from '../../dialog/Dialog'
import { ArrowDown2Icon } from '../../icons/ArrowDown2Icon'
import { FilterIcon } from '../../icons/FilterIcon'
import { MenuIcon } from '../../icons/MenuIcon'
import { NewChatIcon } from '../../icons/NewChatIcon'
import { SearchIcon } from '../../icons/SearchIcon'
import { ChatItem } from './ChatItem'
import './ChatList.css'

interface ChatListProps {
  setVisibleProfile: (prop: boolean) => void;
}

export function ChatList ({ setVisibleProfile }: ChatListProps) {
  const [visibleArrow, setVisibleArrow] = useState(false)
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
          <button className='icon-button' title='Nuevo chat'>
            <NewChatIcon />
          </button>
          <button className='icon-button' title='Menú' onClick={(e) => {
            e.stopPropagation()
            setActiveDialog(!activeDialog)
          } }>
            <MenuIcon />
          </button>
          <Dialog isOpen={activeDialog} onClose={setActiveDialog}>
            <p onClick={() => alert('Nuevo chat')}>Nuevo mensaje</p>
            <p onClick={() => alert('Nuevo grupo')}>Nuevo grupo</p>
            <p onClick={() => socket.disconnect() }>Cerrar sesión</p>
          </Dialog>
        </div>
      </header>
      <search>
        <label htmlFor="search">
            <button
              className="icon-button"
              onClick={() => setVisibleArrow(!visibleArrow)}
            >
              {!visibleArrow && <SearchIcon />}
              <span className={visibleArrow ? 'arrow-search visible-arrow2' : 'arrow-search'}><ArrowDown2Icon /></span>
            </button>
        </label>
        <input
          id="search"
          type="text"
          placeholder="Busca un chat"
          autoComplete="off"
        />
        <button className="icon-button" title="Filtro de chats no leídos">
          <FilterIcon />
        </button>
      </search>
      <section className="chat-list-container">
        <ul className="chat-list">
          <ChatItem isSelected />
          <ChatItem />
        </ul>
      </section>
    </section>
  )
}
