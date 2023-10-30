import { useContext, useEffect, useState } from 'react'
import { AsideContext } from '../../../context/asideContext'
import { useUsers } from '../../../hooks/useUsers'
import { INewGroup, IUser } from '../../../types/types'
import { ArrowDown2Icon } from '../../icons/ArrowDown2Icon'
import { BackArrow } from '../../icons/BackArrow'
import { ListOfUsers } from '../new-chat/ListOfUsers'
import '../new-chat/NewChat.css'
import './NewGroup.css'
import { UserGroupItem } from './UserGroupItem'

export function NewGroup () {
  const { setFilter, filteredUsers, filter } = useUsers()
  const { isVisible, closeNewGroup } = useContext(AsideContext)
  const [data, setData] = useState<INewGroup>({
    members: [],
    userList: []
  })

  useEffect(() => {
    console.log('efecto')
    const newUserList = data.members.length === 0 ? filteredUsers ?? [] : filteredUsers?.filter(user1 => !data.members.find(user2 => user2.id === user1.id)) ?? []
    const newData = {
      ...data,
      userList: newUserList

    }
    setData(newData)
  }, [filteredUsers, data.members])

  const addUser = (newUser: IUser) => {
    const newData = {
      ...data,
      members: [...data.members, newUser]
    }
    setData(newData)
    setFilter('')
  }

  const deleteUser = (newUser: IUser) => {
    const newMembers = data.members.filter(user => user.id !== newUser.id)
    const newData = {
      ...data,
      members: newMembers
    }
    setData(newData)
    setFilter('')
  }

  return (
    <section
      className={
        isVisible?.newGroup ? 'secondary-aside visible-new-group' : 'secondary-aside'
      }
    >
      <header className="new-group-header">
        <button
          className="icon-button"
          onClick={closeNewGroup}
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
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className='search-group-input'
            type="text"
            placeholder={data.members.length > 0 ? '' : 'Escribe el nombre del contacto'} />
        </search>
        <ListOfUsers filteredUsers={data.userList} addUser={addUser} />
        <div className='arrow-icon-container'>
          <button>
            <ArrowDown2Icon />
          </button>
        </div>
      </article>
    </section>
  )
}
