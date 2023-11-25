import { useContext } from 'react'
import { ChatContext } from '../../../../context/chatContext'
import { MainContext } from '../../../../context/mainContext'
import { UserContext } from '../../../../context/userContext'
import { useDelay } from '../../../../hooks/useDelay'
import { useDropdown } from '../../../../hooks/useDropDown'
import { getUsernames } from '../../../../utils/getUsernames'
import { Dropdown } from '../../../lib/dialog/Dropdown'
import { MenuIcon } from '../../../lib/icons/MenuIcon'
import { SearchIcon } from '../../../lib/icons/SearchIcon'
import { ChatImg } from '../../../lib/image/ChatImg'
import './ChatHeader.css'
import { ChatHeaderDropdown } from './ChatHeaderDropdown'

export function ChatHeader () {
  const { user } = useContext(UserContext)
  const { chatState } = useContext(ChatContext)
  const { openInfo, openSearch } = useContext(MainContext)
  const { dropdownOpened, dropdownRef, closeDropdown, toggleDropdown, buttonRef } = useDropdown()
  const { chat, groupUsers } = chatState
  const { delay } = useDelay(3000, chat?.id)

  if (!user) return

  const title = chat?.name
  const usernames = getUsernames(groupUsers, user?.id)
  const isGroup = chat?.admin

  return (
    <header className="chat-header-container">
      <div
        className='info-container-header'
        onClick={openInfo}
      >
        <ChatImg className='header-img' chat={chat} isHeader />
        <div className='info-header-container'>
          <h3 className="title-group text-ellipsis">{title}</h3>
          <h4 className="members text-ellipsis">
            {
              delay
                ? isGroup
                  ? usernames
                  : ''
                : `haz clic aquí para ver la información del ${isGroup ? 'grupo' : 'contacto'}`
            }
          </h4>
        </div>
      </div>
      <div className="icon-container-header">
        <button className="icon-button" title="Buscar" onClick={openSearch}>
          <SearchIcon />
        </button>
        <button
          ref={buttonRef}
          onClick={toggleDropdown}
          className={dropdownOpened ? 'icon-button clicked' : 'icon-button'}
          title="Menú"
        >
          <MenuIcon />
        </button>
        {dropdownOpened &&
        <Dropdown ref={dropdownRef}>
          <ChatHeaderDropdown closeDropdown={closeDropdown} />
        </Dropdown>}
      </div>
    </header>
  )
}
