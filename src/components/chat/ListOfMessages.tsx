import { IMessage } from '../../types/types'
import './ListOfMessages.css'
import { MessageItem } from './MessageItem'

interface ListOfMessagesProps {
  messages: IMessage[];
  infoActive: boolean
}

export function ListOfMessages ({ messages, infoActive }: ListOfMessagesProps) {
  const classNameImg = infoActive ? 'bg-chat info-active' : 'bg-chat'
  return (
    <section className="chat">
      <div className={classNameImg}></div>
      <ul className="messages-list">
        {messages.map((msg, index, arr) => (
          <MessageItem key={msg.id} msg={msg} prevUser={arr[index - 1]?.user} />
        ))}
      </ul>
    </section>
  )
}
