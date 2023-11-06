import { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../../../../../../context/chatContext'
import { MainContext } from '../../../../../../context/mainContext'
import { getAllUsersGroup } from '../../../../../../services/getAllUsersGroup'
import { IGroupMin, IUser } from '../../../../../../types/types'
import './GroupItem.css'

interface GroupItemProps {
  group: IGroupMin
}

export function GroupItem ({ group }: GroupItemProps) {
  const [groupUsers, setGroupUsers] = useState<IUser[]>([])
  const { setActiveChat } = useContext(ChatContext)
  const { closeAside } = useContext(MainContext)
  useEffect(() => {
    getAllUsersGroup(group.id)
      .then(users => users.map((user: IUser) => user.alias).filter((user: string) => user !== 'Claudio'))
      .then(users => setGroupUsers([...users, 'Tú']))
  }, [])

  if (!setActiveChat || !closeAside) return null
  return (
    <li className='common-group-item' onClick={() => {
      setActiveChat(group.id)
      closeAside()
    }}>
      <img src="foto_grupo.jpg" alt="Foto del grupo" />
      <div className='common-group-info'>
        <h5>{group.name}</h5>
        <h6>{groupUsers.join(', ')}</h6>
      </div>
    </li>
  )
}
