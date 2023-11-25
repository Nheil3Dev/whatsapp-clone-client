import { useContext, useEffect, useState } from 'react'
import { closeAside, closeContain } from '../../../../../actions/asideRightActions'
import { selectChat } from '../../../../../actions/chatActions'
import { ChatContext } from '../../../../../context/chatContext'
import { MainContext } from '../../../../../context/mainContext'
import { UserContext } from '../../../../../context/userContext'
import { getAllUsersGroup } from '../../../../../services/getAllUsersGroup'
import { IGroupMin } from '../../../../../types/types'
import { getUsernames } from '../../../../../utils/getUsernames'
import { ChatImg } from '../../../../lib/image/ChatImg'
import './GroupItem.css'

interface GroupItemProps {
  group: IGroupMin
}

export function GroupItem ({ group }: GroupItemProps) {
  const [groupUsers, setGroupUsers] = useState<string>('')
  const { dispatchChat, chats } = useContext(ChatContext)
  const { dispatchAsideRight } = useContext(MainContext)
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
      dispatchChat(selectChat(group.id))
      dispatchAsideRight(closeAside)
      dispatchAsideRight(closeContain)
    }}>
      <ChatImg className='common-group-item-img' chat={chats.filter(chat => chat.id === group.id)[0]} />
      <div className='common-group-info'>
        <h5>{group.name}</h5>
        <h6>{groupUsers}</h6>
      </div>
    </li>
  )
}
