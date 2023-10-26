import { useState } from 'react'
import './App.css'
import { AsideLeft } from './components/aside/AsideLeft'
import { Welcome } from './components/main/Welcome'
import { ChatInfo } from './components/main/chat-info/ChatInfo'
import { ChatForm } from './components/main/chat/ChatForm'
import { ChatHeader } from './components/main/chat/ChatHeader'
import { ListOfMessages } from './components/main/chat/ListOfMessages'
import { SearchMsg } from './components/main/search-messages/SearchMsg'
import { ChatProvider } from './context/chatContext'
import { useSocketIo } from './hooks/useSocketIo'

function App () {
  const { messages, isConnected } = useSocketIo()
  const [visible, setVisible] = useState({
    info: false,
    search: false
  })

  const openInfo = () => setVisible({ info: true, search: false })
  const openSearch = () => setVisible({ info: false, search: true })
  const close = () => setVisible({ info: false, search: false })

  return (
    <ChatProvider>
      <AsideLeft />
      <main>
        {
          !isConnected && <Welcome />
        }
        {
          isConnected &&
          (
            <>
              <div className='chat-container'>
                <ChatHeader openInfo={openInfo} openSearch={openSearch} />
                <ListOfMessages messages={messages} infoActive={visible.info} />
                <ChatForm />
              </div>
              <ChatInfo visible={visible.info} onClose={close} />
              <SearchMsg visible={visible.search} onClose={close} />
            </>
          )
          }
      </main>
    </ChatProvider>
  )
}

export default App
