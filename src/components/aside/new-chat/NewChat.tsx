import { useContext } from 'react'
import { closeNewChat, openNewGroup } from '../../../actions/asideActions'
import { AsideContext } from '../../../context/asideContext'
import { useCssEffects } from '../../../hooks/useCssEffects'
import { useUsers } from '../../../hooks/useUsers'
import { BackArrow } from '../../icons/BackArrow'
import { GroupIcon } from '../../icons/GruopIcon'
import { Search } from '../../search/Search'
import { ListOfUsers } from './ListOfUsers'
import './NewChat.css'

export function NewChat () {
  const { setFilter, isLoading, filteredUsers } = useUsers()
  const { asideState, dispatch } = useContext(AsideContext)
  const { className, handleClick } = useCssEffects(asideState?.newChat ?? false, 'visible-new-chat')
  if (!dispatch) return null
  return (
    <section
      className={className}
    >
      <header className="new-chat-header">
        <button
          className="icon-button"
          onClick={() => handleClick(() => dispatch(closeNewChat))}
        >
          <BackArrow />
        </button>
        <h3>Nuevo chat</h3>
      </header>
      <Search placeholder='Busca un nombre' setFilter={setFilter} visible={asideState?.newChat} isLoading={isLoading} />
      <article className="new-chat-container">
        <div className='new-group-item' onClick={() => dispatch(openNewGroup)}>
          <span className='icon-group-container'>
            <GroupIcon />
          </span>
          <h5>Nuevo grupo</h5>
        </div>
        <span className='divider'>
          <h4>CONTACTOS EN WHATSAPP CLONE</h4>
        </span>
        <ListOfUsers filteredUsers={filteredUsers ?? []} />
      </article>
    </section>
  )
}
