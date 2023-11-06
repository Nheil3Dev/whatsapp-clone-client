import { useContext } from 'react'
import { ChatContext } from '../../../../context/chatContext'
import { ChatHeader } from './ChatHeader'
import { VoidChat } from './VoidChat'
import { ChatForm } from './chat-form/ChatForm'
import { ListOfMessages } from './list-of-messages/ListOfMessages'

export function ChatContainer () {
  const { activeChat } = useContext(ChatContext)
  if (activeChat === '') return <VoidChat />
  return (
    <div className='chat-container'>
      <ChatHeader />
      <ListOfMessages />
      <ChatForm />
    </div>
  )
}
