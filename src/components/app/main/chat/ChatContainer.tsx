import { useContext } from 'react'
import { ChatContext } from '../../../../context/chatContext'
import { ChatHeader } from './ChatHeader'
import { VoidChat } from './VoidChat'
import { ChatForm } from './chat-form/ChatForm'
import { ListOfMessages } from './list-of-messages/ListOfMessages'

export function ChatContainer () {
  const { activeChat } = useContext(ChatContext)
  return (
    <>
      <div className='chat-container'>
        {activeChat === '' && <VoidChat />}
        <ChatHeader />
        <ListOfMessages />
        <ChatForm />
      </div>
    </>
  )
}
