import { useEffect, useState } from 'react'
import './App.css'
import { ChatForm } from './components/ChatForm'
import { ChatHeader } from './components/ChatHeader'
import { ListOfMessages } from './components/ListOfMessages'
import { IMessage } from './types/types'

function App () {
  const [messages, setMessages] = useState<IMessage[]>([])
  useEffect(() => {
    fetch('http://localhost:1234/api/messages')
      .then(res => res.json())
      .then(msg => setMessages(msg))
  }, [])

  return (
    <main>
        <ChatHeader />
        <ListOfMessages messages={messages} />
        <ChatForm />
    </main>
  )
}

export default App
