import { useContext } from 'react'
import { ChatContext } from '../../../../context/chatContext'
import { IMessage } from '../../../../types/types'
import { ChatForm } from './ChatForm'
import { ChatHeader } from './ChatHeader'
import { ListOfMessages } from './ListOfMessages'
import { VoidChat } from './VoidChat'

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
