import { useContext } from 'react'
import { MainContext } from '../../../../../context/mainContext'
import { SocketContext } from '../../../../../context/socketContext'
import { useScrollChat } from '../../../../../hooks/useScrollChat'
import { ArrowDownIcon } from '../../../../lib/icons/ArrowDownIcon'
import './ListOfMessages.css'
import { MessageItem } from './MessageItem'

export function ListOfMessages () {
  const { visible } = useContext(MainContext)
  const { messages } = useContext(SocketContext)
  const classNameImg = `bg-chat ${visible?.aside ? 'info-active' : ''}`
  const { showScrollButton, handleScrollButtonClick, containerRef } = useScrollChat(messages ?? [])
  return (
    <>
      <section ref={containerRef} className="chat" >
        <div className={classNameImg}></div>
        <ul className="messages-list">
          {messages?.map((msg, index, arr) => (
            <MessageItem key={msg.id} msg={msg} prevMsg={arr[index - 1]} />
          ))}
        </ul>
      </section>
      <div className='btn-ctn'>
      {showScrollButton &&
        <button
          className='scroll-button'
          onClick={handleScrollButtonClick}
        >
            <ArrowDownIcon />
        </button>
      }
      </div>
    </>
  )
}
