import { useState } from 'react'
import './App.css'
import { AsideLeft } from './components/aside/AsideLeft'
import { ChatInfo } from './components/chat-info/ChatInfo'
import { ChatForm } from './components/chat/ChatForm'
import { ChatHeader } from './components/chat/ChatHeader'
import { ListOfMessages } from './components/chat/ListOfMessages'
import { useMessages } from './hooks/useMessages'

function App () {
  const [visibleInfo, setVisibleInfo] = useState(false)
  const { messages } = useMessages()
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
