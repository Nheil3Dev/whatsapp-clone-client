import { useContext } from 'react'
import { ChatContext } from '../../../../context/chatContext'
import { ChatHeader } from './ChatHeader'
import { VoidChat } from './VoidChat'
import { ChatForm } from './chat-form/ChatForm'
import { ListOfMessages } from './list-of-messages/ListOfMessages'

export function ChatContainer () {
  const { chatState } = useContext(ChatContext)
  return (
    <>
      <div className='chat-container'>
        {chatState.activeChat === '' && <VoidChat />}
        <ChatHeader />
        <ListOfMessages />
        <ChatForm />
      </div>
    </>
  )
}
