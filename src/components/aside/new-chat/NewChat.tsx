import { BackArrow } from '../../icons/BackArrow'
import { GroupIcon } from '../../icons/GruopIcon'
import { Search } from '../../search/Search'
import './NewChat.css'
import { UserItem } from './UserItem'

interface NewChatProps {
  visibleNewChat: boolean;
  setVisibleNewChat: (prop: boolean) => void;
}

export function NewChat ({ visibleNewChat, setVisibleNewChat }: NewChatProps) {
  return (
    <section
      className={
        visibleNewChat ? 'secondary-aside visible-new-chat' : 'secondary-aside'
      }
    >
      <header className="new-chat-header">
        <button
          className="icon-button"
          onClick={() => setVisibleNewChat(false)}
        >
          <BackArrow />
        </button>
        <h3>Nuevo chat</h3>
      </header>
      <Search placeholder='Busca un nombre' visible={visibleNewChat} />
      <article className="new-chat-container">
        <div className='new-group-item'>
          <span className='icon-group-container'>
            <GroupIcon />
          </span>
          <h5>Nuevo grupo</h5>
        </div>
        <span className='divider'>
          <h4>CONTACTOS EN WHATSAPP CLONE</h4>
        </span>
        <UserItem />
        <UserItem />
        <UserItem />
        <UserItem />
        <UserItem />
        <UserItem />
        <UserItem />
        <UserItem />
        <UserItem />
        <UserItem />
        <UserItem />
        <UserItem />
        <UserItem />
        <UserItem />
      </article>
    </section>
  )
}
