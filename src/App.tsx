import { useContext } from 'react'
import './App.css'
import { AsideLeft } from './components/app/aside/AsideLeft'
import { Welcome } from './components/app/main/Welcome'
import { AsideRight } from './components/app/main/aside-right/AsideRight'
import { ChatContainer } from './components/app/main/chat/ChatContainer'
import { AsideProvider } from './context/asideContext'
import { ChatProvider } from './context/chatContext'
import { MainProvider } from './context/mainContext'
import { SocketContext } from './context/socketContext'

function App () {
  const { isConnected } = useContext(SocketContext)

  return (
    <ChatProvider>
      <MainProvider>
        <AsideProvider>
          <AsideLeft />
        </AsideProvider>
        <main>
          {!isConnected && <Welcome />}
          {isConnected &&
              <>
                <ChatContainer />
                <AsideRight />
              </>
          }
        </main>
      </MainProvider>
    </ChatProvider>
  )
}

export default App
