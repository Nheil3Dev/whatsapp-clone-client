import { useEffect, useState } from 'react'
import { ChatInfoProvider } from '../../../../../context/chatInfoContext'
import { GroupButtons } from './GroupButtons'
import './GroupInfo.css'
import { GroupMoreInfo } from './GroupMoreInfo'
import { GroupPrincipalInfo } from './GroupPrincipalInfo'
import { InfoUsers } from './InfoUsers'

export function GroupInfo () {
  const [className, setClassName] = useState('')
  useEffect(() => {
    setTimeout(() => setClassName('chat-info visible-info'), 1)
  }, [])

  return (
    <div className={className}>
      <section className="chat-info-container">
        <ChatInfoProvider>
          <GroupPrincipalInfo />
          <GroupMoreInfo />
        </ChatInfoProvider>
        <InfoUsers />
        <GroupButtons />
      </section>
    </div>
  )
}
