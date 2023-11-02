import { useContext } from 'react'
import './App.css'
import { AsideLeft } from './components/aside/AsideLeft'
import { AsideRight } from './components/main/AsideRight'
import { Welcome } from './components/main/Welcome'
import { ChatForm } from './components/main/chat/ChatForm'
import { ChatHeader } from './components/main/chat/ChatHeader'
import { ListOfMessages } from './components/main/chat/ListOfMessages'
import { AsideProvider } from './context/asideContext'
import { ChatProvider } from './context/chatContext'
import { MainProvider } from './context/mainContext'
import { SocketContext } from './context/socketContext'

function App () {
  const { messages, isConnected } = useContext(SocketContext)

  return (
    <ChatProvider>
      <MainProvider>
        <AsideProvider>
          <AsideLeft />
        </AsideProvider>
        <main>
          {
            !isConnected && <Welcome />
          }
          {
            isConnected &&
            (
              <>
                <div className='chat-container'>
                  <ChatHeader />
                  <ListOfMessages messages={messages ?? []} />
                  <ChatForm />
                </div>
                <AsideRight />
              </>
            )
          }
        </main>
      </MainProvider>
    </ChatProvider>
  )
}

export default App
