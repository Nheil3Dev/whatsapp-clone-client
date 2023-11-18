import { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../../../../../context/chatContext'
import { MainContext } from '../../../../../context/mainContext'
import { UserContext } from '../../../../../context/userContext'
import { getAllUsersGroup } from '../../../../../services/getAllUsersGroup'
import { IGroupMin } from '../../../../../types/types'
import { getUsernames } from '../../../../../utils/getUsernames'
import './GroupItem.css'

interface GroupItemProps {
  group: IGroupMin
}

export function GroupItem ({ group }: GroupItemProps) {
  const [groupUsers, setGroupUsers] = useState<string>('')
  const { setActiveChat } = useContext(ChatContext)
  const { closeAside, closeContain } = useContext(MainContext)
  const { user } = useContext(UserContext)
  useEffect(() => {
    if (!user) return
    getAllUsersGroup(group.id)
      .then(users => {
        const usernames = getUsernames(users, user.id)
        setGroupUsers(usernames)
      })
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
        <h6>{groupUsers}</h6>
      </div>
    </li>
  )
}
