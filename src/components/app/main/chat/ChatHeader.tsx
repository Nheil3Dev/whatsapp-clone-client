import { useContext } from 'react'
import { ChatContext } from '../../../../context/chatContext'
import { MainContext } from '../../../../context/mainContext'
import { UserContext } from '../../../../context/userContext'
import { useDelay } from '../../../../hooks/useDelay'
import { useDropdown } from '../../../../hooks/useDropDown'
import { getUsernames } from '../../../../utils/getUsernames'
import { UserDefaultAvatar } from '../../../lib/defaults-avatars/UserDefaultAvatar'
import { Dropdown } from '../../../lib/dialog/Dropdown'
import { MenuIcon } from '../../../lib/icons/MenuIcon'
import { SearchIcon } from '../../../lib/icons/SearchIcon'
import './ChatHeader.css'

export function ChatHeader () {
  const { user } = useContext(UserContext)
  const { chat, groupUsers, setActiveChat } = useContext(ChatContext)
  const { openInfo, openSearch, closeAside } = useContext(MainContext)
  const { dropdownOpened, dropdownRef, closeDropdown, toggleDropdown, buttonRef } = useDropdown()
  const { delay } = useDelay(3000, chat)

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
        {
          isGroup
            ? <img
            className='header-img'
            src="./foto_grupo.jpg"
            alt="imagen del grupo"
            title="Detalles del perfil"
            />
            : <span className='header-img'><UserDefaultAvatar /></span>
        }
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
          <p onClick={() => {
            openInfo()
            closeDropdown()
          }}>
            Info. del grupo
          </p>
          <p onClick={() => {
            setActiveChat('')
            closeDropdown()
            closeAside()
          }}>
            Cerrar grupo
          </p>
          <p>Abandonar grupo</p>
        </Dropdown>}
      </div>
    </header>
  )
}
