import { useContext, useState } from 'react'
import { openNewChat, openNewGroup, openProfile } from '../../../../actions/asideActions'
import { AsideContext } from '../../../../context/asideContext'
import { ChatContext } from '../../../../context/chatContext'
import { SocketContext } from '../../../../context/socketContext'
import { UserDefaultAvatar } from '../../../lib/defaults-avatars/UserDefaultAvatar'
import { Dialog } from '../../../lib/dialog/Dialog'
import { MenuIcon } from '../../../lib/icons/MenuIcon'
import { NewChatIcon } from '../../../lib/icons/NewChatIcon'
import './ChatListHeader.css'

export function ChatListHeader () {
  const [activeDialog, setActiveDialog] = useState<boolean>(false)
  const { dispatch } = useContext(AsideContext)
  const { socket } = useContext(SocketContext)
  const { setActiveChat } = useContext(ChatContext)
  if (!dispatch || !socket) return null
  return (
    <header className="chat-list-header">
        <span onClick={() => dispatch(openProfile)} className="img">
          <UserDefaultAvatar />
        </span>
        <div className='icon-container-header-aside'>
          <button className='icon-button' title='Nuevo chat' onClick={() => dispatch(openNewChat)}>
            <NewChatIcon />
          </button>
          <button className='icon-button' title='Menú' onClick={(e) => {
            e.stopPropagation()
            setActiveDialog(!activeDialog)
          } }>
            <MenuIcon />
          </button>
          <Dialog isOpen={activeDialog} onClose={setActiveDialog}>
            <p onClick={() => dispatch(openNewChat)}>Nuevo mensaje</p>
            <p onClick={() => dispatch(openNewGroup)}>Nuevo grupo</p>
            <p onClick={() => {
              socket.disconnect()
              setActiveChat && setActiveChat('')
            }}>
              Cerrar sesión
            </p>
          </Dialog>
        </div>
      </header>
  )
}
