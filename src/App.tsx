import { useContext } from 'react'
import './App.css'
import { Loading } from './components/app/Loading'
import { AsideLeft } from './components/app/aside/AsideLeft'
import { Welcome } from './components/app/main/Welcome'
import { AsideRight } from './components/app/main/aside-right/AsideRight'
import { ChatContainer } from './components/app/main/chat/ChatContainer'
import { Dialog } from './components/lib/dialog/Dialog'
import { AsideProvider } from './context/asideContext'
import { ChatProvider } from './context/chatContext'
import { MainProvider } from './context/mainContext'
import { SocketContext } from './context/socketContext'

function App () {
  const { isConnected } = useContext(SocketContext)

  return (
    <>
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
          <Dialog />
        </MainProvider>
      </ChatProvider>
      {isConnected && <Loading />}
    </>
  )
}

export default App
