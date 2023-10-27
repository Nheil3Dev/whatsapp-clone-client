import { useContext, useState } from 'react'
import { AsideContext } from '../../../context/asideContext'
import { socket } from '../../../hooks/useSocketIo'
import { UserDefaultAvatar } from '../../defaults-avatars/UserDefaultAvatar'
import { Dialog } from '../../dialog/Dialog'
import { MenuIcon } from '../../icons/MenuIcon'
import { NewChatIcon } from '../../icons/NewChatIcon'
import './ChatListHeader.css'

export function ChatListHeader () {
  const [activeDialog, setActiveDialog] = useState<boolean>(false)
  const { openUserInfo, openNewChat } = useContext(AsideContext)
  return (
    <header className="chat-list-header">
        <span onClick={openUserInfo} className="img">
          <UserDefaultAvatar />
        </span>
        <div className='icon-container-header-aside'>
          <button className='icon-button' title='Nuevo chat' onClick={openNewChat}>
            <NewChatIcon />
          </button>
          <button className='icon-button' title='Menú' onClick={(e) => {
            e.stopPropagation()
            setActiveDialog(!activeDialog)
          } }>
            <MenuIcon />
          </button>
          <Dialog isOpen={activeDialog} onClose={setActiveDialog}>
            <p onClick={openNewChat}>Nuevo mensaje</p>
            <p onClick={() => alert('Nuevo grupo')}>Nuevo grupo</p>
            <p onClick={() => socket.disconnect() }>Cerrar sesión</p>
          </Dialog>
        </div>
      </header>
  )
}
