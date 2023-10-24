import { useState } from 'react'
import './AsideLeft.css'
import { ChatList } from './chat-list/ChatList'
import { NewChat } from './new-chat/NewChat'
import { UserInfo } from './user-info/UserInfo'

export function AsideLeft () {
  const [visibleProfile, setVisibleProfile] = useState(false)
  const [visibleNewChat, setVisibleNewChat] = useState(false)
  return (
    <aside className='left-container'>
      <ChatList setVisibleProfile={setVisibleProfile} setVisibleNewChat={setVisibleNewChat} />
      <UserInfo visibleProfile={visibleProfile} setVisibleProfile={setVisibleProfile} />
      <NewChat visibleNewChat={visibleNewChat} setVisibleNewChat={setVisibleNewChat} />
    </aside>
  )
}
