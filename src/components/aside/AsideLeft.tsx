import { useState } from 'react'
import './AsideLeft.css'
import { ChatList } from './ChatList'
import { UserInfo } from './UserInfo'

export function AsideLeft () {
  const [visibleProfile, setVisibleProfile] = useState(false)
  return (
    <aside className='left-container'>
      <ChatList setVisibleProfile={setVisibleProfile} />
      <UserInfo visibleProfile={visibleProfile} setVisibleProfile={setVisibleProfile} />
    </aside>
  )
}
