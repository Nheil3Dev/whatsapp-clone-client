import { useContext } from 'react'
import { openNewChat, openProfile } from '../../../../actions/asideActions'
import { AsideContext } from '../../../../context/asideContext'
import { SocketContext } from '../../../../context/socketContext'
import { UserContext } from '../../../../context/userContext'
import { useDropdown } from '../../../../hooks/useDropDown'
import { IUserMin } from '../../../../types/types'
import { Dropdown } from '../../../lib/dialog/Dropdown'
import { MenuIcon } from '../../../lib/icons/MenuIcon'
import { NewChatIcon } from '../../../lib/icons/NewChatIcon'
import { UserImg } from '../../../lib/image/UserImg'
import './ChatListHeader.css'
import { ChatListHeaderDropdown } from './ChatListHeaderDropdown'

export function ChatListHeader () {
  const { dispatch } = useContext(AsideContext)
  const { socketState } = useContext(SocketContext)
  const { user } = useContext(UserContext)
  const { dropdownOpened, dropdownRef, closeDropdown, toggleDropdown, buttonRef } = useDropdown()

  return (
    <header className="chat-list-header">
        {socketState.isConnected
          ? <>
              <span onClick={() => dispatch(openProfile)} className='img'>
                <UserImg className='img' user={user ?? {} as IUserMin} />
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
                    <ChatListHeaderDropdown closeDropdown={closeDropdown} />
                  </Dropdown>
                }
              </div>
            </>
          : <h1 className='init-heading'>WhatsApp Web Clone <span>by Nheil3Dev</span></h1>
        }
      </header>
  )
}
