import { useEffect, useState } from 'react'
import './App.css'
import { ChatForm } from './components/ChatForm'
import { ChatHeader } from './components/ChatHeader'
import { ListOfMessages } from './components/ListOfMessages'
import { ChatItem } from './components/aside/ChatItem'
import { FilterIcon } from './components/icons/FilterIcon'
import { SearchIcon } from './components/icons/SearchIcon'
import { IMessage } from './types/types'

function App () {
  const [messages, setMessages] = useState<IMessage[]>([])
  useEffect(() => {
    fetch('http://localhost:1234/api/messages')
      .then(res => res.json())
      .then(msg => setMessages(msg))
  }, [])

  return (
    <>
      <aside>
        <header>
          <img className='img' src="random-img.jpg" alt="Foto de perfil de usuario" />
          <h3 className='title-group'>Claudio</h3>
        </header>
         <search>
          <label htmlFor='search'>
            <SearchIcon />
          </label>
            <input id='search' type="text" placeholder='Busca un chat' autoComplete='off' />
           <button className='form-button'>
            <FilterIcon />
           </button>
         </search>
        <section className='chat-list-container'>
          <ul className='chat-list'>
            <ChatItem isSelected />
            <ChatItem />
            <ChatItem />
            <ChatItem />
            <ChatItem />
            <ChatItem />
            <ChatItem />
            <ChatItem />
            <ChatItem />
            <ChatItem />
            <ChatItem />
            <ChatItem />
            <ChatItem />
            <ChatItem />
          </ul>
        </section>
      </aside>
      <main>
        <ChatHeader />
        <ListOfMessages messages={messages} />
        <ChatForm />
      </main>
    </>
  )
}

export default App
