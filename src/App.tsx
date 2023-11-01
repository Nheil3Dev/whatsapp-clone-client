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
import { useSocketIo } from './hooks/useSocketIo'

function App () {
  const { messages, isConnected } = useSocketIo()

  return (
    <ChatProvider>
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
            <MainProvider>
              <div className='chat-container'>
                <ChatHeader />
                <ListOfMessages messages={messages} />
                <ChatForm />
              </div>
              <AsideRight />
            </MainProvider>
          )
          }
      </main>
    </ChatProvider>
  )
}

export default App
