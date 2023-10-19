import { useEffect, useState } from 'react'
import './App.css'
import { ChatForm } from './components/ChatForm'
import { ChatHeader } from './components/ChatHeader'
import { ListOfMessages } from './components/ListOfMessages'
import { AsideLeft } from './components/aside/AsideLeft'
import { OutIcon } from './components/icons/OutIcon'
import { SearchIcon } from './components/icons/SearchIcon'
import { XIcon } from './components/icons/XIcon'
import { InfoUserItem } from './components/info/InfoUserItem'
import { IMessage } from './types/types'

function App () {
  const [messages, setMessages] = useState<IMessage[]>([])
  const [visibleInfo, setVisibleInfo] = useState(true)
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
          <aside className={visibleInfo ? 'chat-info visible-info' : 'chat-info'}>
            <header>
              <button onClick={() => setVisibleInfo(false)} className='form-button'>
                <XIcon />
              </button>
              <h3 className='info-title'>Info. del grupo</h3>
            </header>
            <section className='info-container'>
              <article className='info-group'>
                <img src="foto_grupo.jpg" alt="Foto de grupo" />
                <h5 className='info-group-title'>¡Al cielo con ella!</h5>
                <p className='info-group-description'>Grupo · 9 participantes</p>
              </article>
              <article className='info-users'>
                <div className='info-users-header'>
                  <p className='info-users-title'>9 participantes</p>
                  <button className='form-button'>
                    <SearchIcon />
                  </button>
                </div>
                <InfoUserItem />
                <InfoUserItem />
                <InfoUserItem />
                <InfoUserItem />
                <InfoUserItem />
                <InfoUserItem />
                <InfoUserItem />
                <InfoUserItem />
                <InfoUserItem />
                <InfoUserItem />
              </article>
              <button className='info-button'>
                <OutIcon />
                Salir del grupo
              </button>
            </section>
          </aside>
      </main>
    </>
  )
}

export default App
