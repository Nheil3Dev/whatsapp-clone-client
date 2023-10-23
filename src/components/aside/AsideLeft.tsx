import { useState } from 'react'
import './AsideLeft.css'
import { ChatList } from './chat-list/ChatList'
import { UserInfo } from './user-info/UserInfo'

export function AsideLeft () {
  const [visibleProfile, setVisibleProfile] = useState(false)
  return (
    <aside className='left-container'>
      <ChatList setVisibleProfile={setVisibleProfile} />
      <UserInfo visibleProfile={visibleProfile} setVisibleProfile={setVisibleProfile} />
    </aside>
  )
}
