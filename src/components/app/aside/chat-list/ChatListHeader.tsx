import { useContext } from 'react'
import { openNewChat, openNewGroup, openProfile } from '../../../../actions/asideActions'
import { AsideContext } from '../../../../context/asideContext'
import { ChatContext } from '../../../../context/chatContext'
import { SocketContext } from '../../../../context/socketContext'
import { useDropdown } from '../../../../hooks/useDropDown'
import { UserDefaultAvatar } from '../../../lib/defaults-avatars/UserDefaultAvatar'
import { Dropdown } from '../../../lib/dialog/Dropdown'
import { MenuIcon } from '../../../lib/icons/MenuIcon'
import { NewChatIcon } from '../../../lib/icons/NewChatIcon'
import './ChatListHeader.css'

export function ChatListHeader () {
  const { dispatch } = useContext(AsideContext)
  const { socket, isConnected } = useContext(SocketContext)
  const { setActiveChat } = useContext(ChatContext)
  const { dropdownOpened, dropdownRef, closeDropdown, toggleDropdown, buttonRef } = useDropdown()

  return (
    <header className="chat-list-header">
        {isConnected
          ? <>
              <span onClick={() => dispatch(openProfile)} className="img">
                <UserDefaultAvatar />
              </span>
              <div className='icon-container-header-aside'>
                <button className='icon-button' title='Nuevo chat' onClick={() => dispatch(openNewChat)}>
                  <NewChatIcon />
                </button>
                <button ref={buttonRef} className={dropdownOpened ? 'icon-button clicked' : 'icon-button'} title='Menú' onClick={toggleDropdown}>
                  <MenuIcon />
                </button>
                {dropdownOpened &&
                  <Dropdown ref={dropdownRef}>
                    <p onClick={() => {
                      dispatch(openNewChat)
                      closeDropdown()
                    }}>
                      Nuevo mensaje
                    </p>
                    <p onClick={() => {
                      dispatch(openNewGroup)
                      closeDropdown()
                    }}>
                      Nuevo grupo
                    </p>
                    <p onClick={() => {
                      socket.disconnect()
                      setActiveChat('')
                      closeDropdown()
                    }}>
                      Cerrar sesión
                    </p>
                  </Dropdown>
                }
              </div>
            </>
          : <h1 className='init-heading'>WhatsApp Web Clone <span>by Nheil3Dev</span></h1>
        }
      </header>
  )
}
