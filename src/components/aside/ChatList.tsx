import { FilterIcon } from '../icons/FilterIcon'
import { SearchIcon } from '../icons/SearchIcon'
import { ChatItem } from './ChatItem'
import './ChatList.css'

interface ChatListProps {
    setVisibleProfile: (prop: boolean) => void
}

export function ChatList ({ setVisibleProfile }: ChatListProps) {
  return (
        <section className='principal-aside'>
        <header>
          <img
            onClick={() => setVisibleProfile(true)}
            className="img"
            src="random-img.jpg"
            alt="Foto de perfil de usuario"
          />
          <h3 className="title-group">Claudio</h3>
        </header>
        <search>
          <label htmlFor="search">
            <SearchIcon />
          </label>
          <input
            id="search"
            type="text"
            placeholder="Busca un chat"
            autoComplete="off"
          />
          <button className="icon-button" title="Filtro de chats no leídos">
            <FilterIcon />
          </button>
        </search>
        <section className="chat-list-container">
          <ul className="chat-list">
            <ChatItem isSelected />
            <ChatItem />
            <ChatItem />
            <ChatItem />
            <ChatItem />
            <ChatItem />
            <ChatItem />
            <ChatItem />
            <ChatItem />
            <ChatItem />
            <ChatItem />
            <ChatItem />
            <ChatItem />
            <ChatItem />
          </ul>
        </section>
      </section>
  )
}
