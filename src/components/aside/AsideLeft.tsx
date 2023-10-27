import { useContext } from 'react'
import { AsideContext } from '../../context/asideContext'
import './AsideLeft.css'
import { ChatList } from './chat-list/ChatList'
import { NewChat } from './new-chat/NewChat'
import { UserInfo } from './user-info/UserInfo'

export function AsideLeft () {
  const { isVisible } = useContext(AsideContext)
  return (
    <aside className='left-container'>
      <ChatList />
      <UserInfo />
      {isVisible?.newChat && <NewChat />}
    </aside>
  )
}
