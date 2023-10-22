import { useState } from 'react'
import './App.css'
import { AsideLeft } from './components/aside/AsideLeft'
import { ChatInfo } from './components/chat-info/ChatInfo'
import { ChatForm } from './components/chat/ChatForm'
import { ChatHeader } from './components/chat/ChatHeader'
import { ListOfMessages } from './components/chat/ListOfMessages'
import { socket, useSocketIo } from './hooks/useSocketIo'

function App () {
  const [visibleInfo, setVisibleInfo] = useState(false)
  const { messages, isConnected } = useSocketIo()

  return (
    <>
      <AsideLeft />
      <main>
        {
          !isConnected &&
            (<div className='welcome-container'>
              <h1>Whatsapp Web Clone</h1>
              <p>
                This is a clone of whatsapp web app. I built it for enterteinament and education.
              </p>
              <p>Visit my repo - <a target='blank' href="https://github.com/Nheil3Dev">Nheil3Dev</a></p>
              <button onClick={() => socket.connect()}>
                Entrar en la aplicación
              </button>
            </div>)
        }
        {
          isConnected &&
          (
            <>
              <div className='chat-container'>
                <ChatHeader setVisibleInfo={setVisibleInfo} />
                <ListOfMessages messages={messages} infoActive={visibleInfo} />
                <ChatForm />
              </div>
              <ChatInfo visibleInfo={visibleInfo} setVisibleInfo={setVisibleInfo} />
            </>
          )
          }
      </main>
    </>
  )
}

export default App
