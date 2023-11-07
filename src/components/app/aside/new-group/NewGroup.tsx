import { useContext } from 'react'
import { closeNewGroup, openConfirm } from '../../../../actions/asideActions'
import { AsideContext } from '../../../../context/asideContext'
import { useCssEffects } from '../../../../hooks/useCssEffects'
import { useNewGroup } from '../../../../hooks/useNewGroup'
import { ArrowDown2Icon } from '../../../lib/icons/ArrowDown2Icon'
import { BackArrow } from '../../../lib/icons/BackArrow'
import { ListOfUsers } from '../new-chat/ListOfUsers'
import '../new-chat/NewChat.css'
import './NewGroup.css'
import { UserGroupItem } from './UserGroupItem'
import { ConfirmGroup } from './confirm/ConfirmGroup'

export function NewGroup () {
  const { asideState, dispatch } = useContext(AsideContext)
  const { inputGroupRef, data, addUser, deleteUser, filter, setFilter } = useNewGroup()
  const { className, handleClick } = useCssEffects(asideState?.newGroup, 'visible-new-group')

  return (
    <>
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
              <button onClick={() => dispatch(openConfirm)}>
                <ArrowDown2Icon />
              </button>
            </div>}
        </article>
      </section>
      {asideState?.confirm && <ConfirmGroup data={data} />}
    </>
  )
}
