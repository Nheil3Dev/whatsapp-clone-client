import { useEffect, useRef } from 'react'
import { IMessage } from '../../types/types'
import './ListOfMessages.css'
import { MessageItem } from './MessageItem'

interface ListOfMessagesProps {
  messages: IMessage[];
  infoActive: boolean
}

export function ListOfMessages ({ messages, infoActive }: ListOfMessagesProps) {
  const container = useRef(null)

  useEffect(() => {
    const scrollToBottom = () => {
      container.current.scrollTop = container.current.scrollHeight
    }

    // Un poco pirata --> Hay que arreglarlo
    const index = setTimeout(() => scrollToBottom(), 100)

    return () => clearTimeout(index)
  }, [messages])

  // const classNameImg = infoActive ? 'bg-chat info-active' : 'bg-chat'
  const classNameImg = `bg-chat ${infoActive ? 'info-active' : ''}`
  return (
    <section ref={container} className="chat" >
      <div className={classNameImg}></div>
      <ul className="messages-list">
        {messages.map((msg, index, arr) => (
          <MessageItem key={msg.id} msg={msg} prevUser={arr[index - 1]?.user} />
        ))}
      </ul>
    </section>
  )
}
