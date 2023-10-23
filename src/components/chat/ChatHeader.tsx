import { useState } from 'react'
import { Dialog } from '../dialog/Dialog'
import { MenuIcon } from '../icons/MenuIcon'
import { SearchIcon } from '../icons/SearchIcon'
import './ChatHeader.css'

interface ChatHeaderProps {
  setVisibleInfo: (visible: boolean) => void;
}

export function ChatHeader ({ setVisibleInfo }: ChatHeaderProps) {
  const [visibleDetails, setVisibleDetails] = useState(false)

  return (
    <header className="chat-header-container">
      <div
        className='info-container-header'
        onClick={() => setVisibleInfo(true)}
      >
        <img
          src="./foto_grupo.jpg"
          alt="imagen del grupo"
          title="Detalles del perfil"
        />
        <div>
          <h3 className="title-group">¡Al cielo con ella!</h3>
          <h4 className="members">
            Antonio, Bañón, Dani, Deivy, Jara, Jona, Oscar, Sara, Tú
          </h4>
        </div>
      </div>
      <div className="icon-container-header">
        <button className="icon-button" title="Buscar">
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
          <p onClick={() => setVisibleInfo(true)}>Info. del grupo</p>
          <p>Cerrar grupo</p>
          <p>Abandonar grupo</p>
        </Dialog>
      </div>
    </header>
  )
}
