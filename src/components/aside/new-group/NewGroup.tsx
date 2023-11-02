import { useContext } from 'react'
import { closeNewGroup } from '../../../actions/asideActions'
import { AsideContext } from '../../../context/asideContext'
import { ChatContext } from '../../../context/chatContext'
import { useCssEffects } from '../../../hooks/useCssEffects'
import { useNewGroup } from '../../../hooks/useNewGroup'
import { createGroup } from '../../../services/createGroup'
import { ArrowDown2Icon } from '../../icons/ArrowDown2Icon'
import { BackArrow } from '../../icons/BackArrow'
import { ListOfUsers } from '../new-chat/ListOfUsers'
import '../new-chat/NewChat.css'
import './NewGroup.css'
import { UserGroupItem } from './UserGroupItem'

export function NewGroup () {
  const { chats, setChats, setActiveChat } = useContext(ChatContext)
  const { asideState, dispatch } = useContext(AsideContext)
  const { inputGroupRef, data, addUser, deleteUser, filter, setFilter } = useNewGroup()
  const { className, handleClick } = useCssEffects(asideState?.newGroup ?? false, 'visible-new-group')

  // TODO: Se desconecta al crear el grupo por el hook del socketIo en concreto por el lastMsg que utilizo
  // en ChatItem
  const createNewGroup = async () => {
    // TODO: coger el id del usuario no el 'mio'
    const idAdmin = 'cd89bf8f-e422-47f5-867d-2567caf3e476'
    const usersId = data.members.map(member => member.id ?? '')
    usersId.push(idAdmin)
    const response = await createGroup(idAdmin, usersId).then(res => res.json())
    if (response === true) {
      const newGroup = {
        id: '1234',
        name: 'Nuevo Grupo',
        info: '',
        date: new Date(),
        admin: idAdmin
      }
      const newChats = [newGroup, ...chats ?? []]
      setChats && setChats(newChats)
      dispatch && dispatch({ type: 'close_new_group' })
      dispatch && dispatch({ type: 'close_new_chat' })
      setActiveChat && setActiveChat('1234')
    }
  }

  if (!dispatch) return null

  return (
    <section
      className={className}
    >
      <header className="new-group-header">
        <button
          className="icon-button"
          onClick={() => handleClick(() => dispatch(closeNewGroup))}
        >
          <BackArrow />
        </button>
        <h3>Añade participantes del grupo</h3>
      </header>
      <article className="new-group-container">
        <div className='new-group-users'>
          {
            data.members.map(user => (
              <UserGroupItem key={user.id} user={user} deleteUser={deleteUser} />
            ))
          }
        </div>
        <search className='search-group'>
          <input
            ref={inputGroupRef}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className='search-group-input'
            type="text"
            placeholder={data.members.length > 0 ? '' : 'Escribe el nombre del contacto'} />
        </search>
        <ListOfUsers filteredUsers={data.userList} addUser={addUser} />
        {data.members.length > 0 &&
          <div className='arrow-icon-container'>
            <button onClick={createNewGroup}>
              <ArrowDown2Icon />
            </button>
          </div>}
      </article>
    </section>
  )
}
