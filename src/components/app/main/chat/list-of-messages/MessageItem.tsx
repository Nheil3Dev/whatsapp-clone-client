import { useContext } from 'react'
import { UserContext } from '../../../../../context/userContext'
import { IMessage } from '../../../../../types/types'
import { getLocalTime } from '../../../../../utils/getLocalTime'
import { UserDefaultAvatar } from '../../../../lib/defaults-avatars/UserDefaultAvatar'
import './MessageItem.css'
import { MsgDate } from './MsgDate'

interface MessageProps {
  msg: IMessage
  prevMsg: IMessage
}

export function MessageItem ({ msg, prevMsg }: MessageProps) {
  const { user } = useContext(UserContext)
  const isMyMessage = msg.alias === user?.alias
  const isFirstMessage = !prevMsg?.alias || msg.alias !== prevMsg?.alias

  const className = isMyMessage
    ? isFirstMessage
      ? 'message myself'
      : 'message myself same-user'
    : isFirstMessage
      ? 'message'
      : 'message same-user'

  return (
    <li id={String(msg?.id)} className='msg-li'>
      <MsgDate key={`date${msg.id}`} date={msg.date} prevDate={prevMsg?.date} />
      <div className={className}>
        {!isMyMessage && isFirstMessage && (
          <>
            <span className='msg-item-img'><UserDefaultAvatar /></span>
            <small>{msg.alias}</small>
          </>
        )}
        <p>{msg.content}</p>
        <span>{getLocalTime(msg.date)}</span>
      </div>
    </li>
  )
}
