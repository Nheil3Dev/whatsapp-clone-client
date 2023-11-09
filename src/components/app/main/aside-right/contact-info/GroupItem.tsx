import { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../../../../../context/chatContext'
import { MainContext } from '../../../../../context/mainContext'
import { UserContext } from '../../../../../context/userContext'
import { getAllUsersGroup } from '../../../../../services/getAllUsersGroup'
import { IGroupMin, IUser } from '../../../../../types/types'
import './GroupItem.css'

interface GroupItemProps {
  group: IGroupMin
}

export function GroupItem ({ group }: GroupItemProps) {
  const [groupUsers, setGroupUsers] = useState<IUser[]>([])
  const { setActiveChat } = useContext(ChatContext)
  const { closeAside, closeContain } = useContext(MainContext)
  const { user: auth } = useContext(UserContext)
  useEffect(() => {
    getAllUsersGroup(group.id)
      .then(users => users.map((user: IUser) => user.alias).filter((user: string) => user !== auth?.alias))
      .then(users => setGroupUsers([...users, 'Tú']))
  }, [])

  return (
    <li className='common-group-item' onClick={() => {
      setActiveChat(group.id)
      closeAside()
      closeContain()
    }}>
      <img src="foto_grupo.jpg" alt="Foto del grupo" />
      <div className='common-group-info'>
        <h5>{group.name}</h5>
        <h6>{groupUsers.join(', ')}</h6>
      </div>
    </li>
  )
}
