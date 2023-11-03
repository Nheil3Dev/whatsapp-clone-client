import { useContext } from 'react'
import './App.css'
import { AsideLeft } from './components/app/aside/AsideLeft'
import { Welcome } from './components/app/main/Welcome'
import { AsideRight } from './components/app/main/aside-right/AsideRight'
import { ChatForm } from './components/app/main/chat/ChatForm'
import { ChatHeader } from './components/app/main/chat/ChatHeader'
import { ListOfMessages } from './components/app/main/chat/ListOfMessages'
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
