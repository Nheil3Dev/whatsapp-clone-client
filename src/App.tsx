import { useEffect, useState } from 'react'
import './App.css'
import { AsideLeft } from './components/aside/AsideLeft'
import { ChatInfo } from './components/chat-info/ChatInfo'
import { ChatForm } from './components/chat/ChatForm'
import { ChatHeader } from './components/chat/ChatHeader'
import { ListOfMessages } from './components/chat/ListOfMessages'
import { IMessage } from './types/types'

function App () {
  const [messages, setMessages] = useState<IMessage[]>([])
  const [visibleInfo, setVisibleInfo] = useState(false)
  useEffect(() => {
    fetch('http://localhost:1234/api/messages')
      .then(res => res.json())
      .then(msg => setMessages(msg))
  }, [])

  return (
    <>
      <AsideLeft />
      <main>
        <div className='chat-container'>
          <ChatHeader setVisibleInfo={setVisibleInfo} />
          <ListOfMessages messages={messages} />
          <ChatForm />
        </div>
        <ChatInfo visibleInfo={visibleInfo} setVisibleInfo={setVisibleInfo} />
      </main>
    </>
  )
}

export default App
