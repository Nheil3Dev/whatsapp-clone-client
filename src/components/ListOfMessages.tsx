import { IMessage } from '../types/types'
import { MessageItem } from './MessageItem'

interface ListOfMessagesProps {
  messages: IMessage[];
}

export function ListOfMessages ({ messages }: ListOfMessagesProps) {
  return (
    <section className="chat">
      <ul className="messages-list">
        {messages.map((msg, index, arr) => (
          <MessageItem key={msg.id} msg={msg} prevUser={arr[index - 1]?.user} />
        ))}
      </ul>
    </section>
  )
}
