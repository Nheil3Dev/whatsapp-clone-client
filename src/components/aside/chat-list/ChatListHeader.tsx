import { useState } from 'react'
import { socket } from '../../../hooks/useSocketIo'
import { Dialog } from '../../dialog/Dialog'
import { MenuIcon } from '../../icons/MenuIcon'
import { NewChatIcon } from '../../icons/NewChatIcon'
import './ChatListHeader.css'

interface ChatListHeaderProps {
  setVisibleProfile: (prop: boolean) => void
  setVisibleNewChat: (prop: boolean) => void
}

export function ChatListHeader ({ setVisibleProfile, setVisibleNewChat }: ChatListHeaderProps) {
  const [activeDialog, setActiveDialog] = useState<boolean>(false)
  return (
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
  )
}
