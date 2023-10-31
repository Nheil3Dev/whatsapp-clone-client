import { useContext } from 'react'
import { AsideContext } from '../../context/asideContext'
import './AsideLeft.css'
import { ChatList } from './chat-list/ChatList'
import { NewChat } from './new-chat/NewChat'
import { NewGroup } from './new-group/NewGroup'
import { UserInfo } from './user-info/UserInfo'

export function AsideLeft () {
  const { asideState } = useContext(AsideContext)
  return (
    <aside className='left-container'>
      <ChatList />
      {asideState?.userInfo && <UserInfo />}
      {asideState?.newChat && <NewChat />}
      {asideState?.newGroup && <NewGroup />}
    </aside>
  )
}
