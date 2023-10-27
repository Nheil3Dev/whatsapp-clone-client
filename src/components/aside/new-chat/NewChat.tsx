import { useContext } from 'react'
import { AsideContext } from '../../../context/asideContext'
import { useUsers } from '../../../hooks/useUsers'
import { BackArrow } from '../../icons/BackArrow'
import { GroupIcon } from '../../icons/GruopIcon'
import { Search } from '../../search/Search'
import './NewChat.css'
import { UserItem } from './UserItem'

export function NewChat () {
  const { setFilter, isLoading, filteredUsers, filter } = useUsers()
  const { isVisible, closeNewChat } = useContext(AsideContext)

  return (
    <section
      className={
        isVisible?.newChat ? 'secondary-aside visible-new-chat' : 'secondary-aside'
      }
    >
      <header className="new-chat-header">
        <button
          className="icon-button"
          onClick={closeNewChat}
        >
          <BackArrow />
        </button>
        <h3>Nuevo chat</h3>
      </header>
      <Search placeholder='Busca un nombre' setFilter={setFilter} visible={isVisible?.newChat} isLoading={isLoading} />
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
        {
          filteredUsers?.map(user => (
            <UserItem key={user.id} user={user} filter={filter} />
          ))
        }
      </article>
    </section>
  )
}
