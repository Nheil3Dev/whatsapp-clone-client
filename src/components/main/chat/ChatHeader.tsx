import { useContext, useState } from 'react'
import { ChatContext } from '../../../context/chatContext'
import { UserDefaultAvatar } from '../../defaults-avatars/UserDefaultAvatar'
import { Dialog } from '../../dialog/Dialog'
import { MenuIcon } from '../../icons/MenuIcon'
import { SearchIcon } from '../../icons/SearchIcon'
import './ChatHeader.css'

interface ChatHeaderProps {
  openInfo: () => void;
  openSearch: () => void
}

export function ChatHeader ({ openInfo, openSearch }: ChatHeaderProps) {
  const [visibleDetails, setVisibleDetails] = useState(false)
  const { chat, groupUsers } = useContext(ChatContext)
  const title = chat?.name
  const usernames = groupUsers?.map(user => user.alias)
  return (
    <header className="chat-header-container">
      <div
        className='info-container-header'
        onClick={() => openInfo()}
      >
        {
          chat?.admin
            ? <img
            className='header-img'
            src="./foto_grupo.jpg"
            alt="imagen del grupo"
            title="Detalles del perfil"
            />
            : <span className='header-img'><UserDefaultAvatar /></span>
        }
        <div>
          <h3 className="title-group">{title}</h3>
          {chat?.admin && <h4 className="members">
            {
              groupUsers
                ? usernames?.filter(user => user !== 'Claudio').join(', ').concat(', Tú')
                : 'haz clic aquí para ver la información del grupo'
            }
          </h4>}
        </div>
      </div>
      <div className="icon-container-header">
        <button className="icon-button" title="Buscar" onClick={() => openSearch()}>
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
          <p onClick={() => openInfo()}>Info. del grupo</p>
          <p>Cerrar grupo</p>
          <p>Abandonar grupo</p>
        </Dialog>
      </div>
    </header>
  )
}
