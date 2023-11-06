import { useContext } from 'react'
import { ChatContext } from '../../../../context/chatContext'
import { IMessage } from '../../../../types/types'
import { ChatHeader } from './ChatHeader'
import { VoidChat } from './VoidChat'
import { ChatForm } from './chat-form/ChatForm'
import { ListOfMessages } from './list-of-messages/ListOfMessages'

interface ChatContainerProps {
  messages: IMessage[]
}

export function ChatContainer ({ messages }: ChatContainerProps) {
  const { activeChat } = useContext(ChatContext)
  if (!messages || activeChat === '') return <VoidChat />
  return (
    <div className='chat-container'>
      <ChatHeader />
      <ListOfMessages messages={messages} />
      <ChatForm />
    </div>
  )
}
