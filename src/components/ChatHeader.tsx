import { MenuIcon } from './icons/MenuIcon'
import { SearchIcon } from './icons/SearchIcon'

export function ChatHeader () {
  return (
    <header>
      <img className="img" src="./foto_grupo.jpg" alt="imagen del grupo" />
      <div>
        <h3 className="title-group">¡Al cielo con ella!</h3>
        <h4 className="members">
          Antonio, Bañón, Dani, Deivy, Jara, Jona, Oscar, Sara, Tú
        </h4>
      </div>
      <div className="icon-container-header">
        <SearchIcon />
        <MenuIcon />
      </div>
    </header>
  )
}
