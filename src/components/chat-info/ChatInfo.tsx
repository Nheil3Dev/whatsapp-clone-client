import { OutIcon } from '../icons/OutIcon'
import { SearchIcon } from '../icons/SearchIcon'
import { XIcon } from '../icons/XIcon'
import './ChatInfo.css'
import { InfoUserItem } from './InfoUserItem'

interface ChatInfoProps {
  visibleInfo: boolean
  setVisibleInfo: (prop: boolean) => void
}

export function ChatInfo ({ visibleInfo, setVisibleInfo }: ChatInfoProps) {
  return (
    <aside className={visibleInfo ? 'chat-info visible-info' : 'chat-info'}>
      <header>
        <button onClick={() => setVisibleInfo(false)} className="icon-button">
          <XIcon />
        </button>
        <h3 className="info-title">Info. del grupo</h3>
      </header>
      <section className="info-container">
        <article className="info-group">
          <img src="foto_grupo.jpg" alt="Foto de grupo" />
          <h5 className="info-group-title">¡Al cielo con ella!</h5>
          <p className="info-group-description">Grupo · 9 participantes</p>
        </article>
        <article className="info-users">
          <div className="info-users-header">
            <p className="info-users-title">9 participantes</p>
            <button className="icon-button">
              <SearchIcon />
            </button>
          </div>
          <InfoUserItem />
          <InfoUserItem />
          <InfoUserItem />
          <InfoUserItem />
          <InfoUserItem />
          <InfoUserItem />
          <InfoUserItem />
          <InfoUserItem />
          <InfoUserItem />
          <InfoUserItem />
        </article>
        <button className="info-button">
          <OutIcon />
          Salir del grupo
        </button>
      </section>
    </aside>
  )
}
