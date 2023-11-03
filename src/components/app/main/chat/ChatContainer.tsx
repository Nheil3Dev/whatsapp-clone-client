import { IMessage } from '../../../../types/types'
import { ChatForm } from './ChatForm'
import { ChatHeader } from './ChatHeader'
import { ListOfMessages } from './ListOfMessages'

interface ChatContainerProps {
  messages: IMessage[]
}

export function ChatContainer ({ messages }: ChatContainerProps) {
  return (
    <div className='chat-container'>
      <ChatHeader />
      <ListOfMessages messages={messages} />
      <ChatForm />
    </div>
  )
}
