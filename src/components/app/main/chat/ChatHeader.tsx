import { useContext, useState } from 'react'
import { ChatContext } from '../../../../context/chatContext'
import { MainContext } from '../../../../context/mainContext'
import { UserContext } from '../../../../context/userContext'
import { useDelay } from '../../../../hooks/useDelay'
import { UserDefaultAvatar } from '../../../lib/defaults-avatars/UserDefaultAvatar'
import { Dialog } from '../../../lib/dialog/Dialog'
import { MenuIcon } from '../../../lib/icons/MenuIcon'
import { SearchIcon } from '../../../lib/icons/SearchIcon'
import './ChatHeader.css'

export function ChatHeader () {
  const { user } = useContext(UserContext)
  const [visibleDetails, setVisibleDetails] = useState(false)
  const { chat, groupUsers, setActiveChat } = useContext(ChatContext)
  const { openInfo, openSearch, closeAside } = useContext(MainContext)
  const { delay } = useDelay(3000, chat)

  const title = chat?.name
  const usernames = groupUsers?.map(user => user.alias)
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
                  ? usernames?.filter(username => username !== user?.alias).join(', ').concat(', Tú')
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
          onClick={(e) => {
            e.stopPropagation()
            setVisibleDetails(!visibleDetails)
          }}
          className="icon-button"
          title="Menú"
        >
          <MenuIcon />
        </button>
        <Dialog isOpen={visibleDetails} onClose={setVisibleDetails}>
          <p onClick={openInfo}>Info. del grupo</p>
          <p onClick={() => {
            setActiveChat('')
            closeAside()
          }}>
            Cerrar grupo
          </p>
          <p>Abandonar grupo</p>
        </Dialog>
      </div>
    </header>
  )
}
