import { MenuIcon } from '../icons/MenuIcon'
import { SearchIcon } from '../icons/SearchIcon'
import './ChatHeader.css'

interface ChatHeaderProps {
  setVisibleInfo: (visible: boolean) => void;
}

export function ChatHeader ({ setVisibleInfo }: ChatHeaderProps) {
  return (
    <header>
      <img
        onClick={() => setVisibleInfo(true)}
        className="img"
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
      <div className="icon-container-header">
        <button className="icon-button" title="Buscar">
          <SearchIcon />
        </button>
        <button className="icon-button" title="Menú">
          <MenuIcon />
        </button>
      </div>
    </header>
  )
}
