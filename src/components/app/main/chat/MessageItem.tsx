import { type IMessage } from '../../../../types/types'
import { getLocalTime } from '../../../../utils/getLocalTime'
import { UserDefaultAvatar } from '../../../lib/defaults-avatars/UserDefaultAvatar'

interface MessageProps {
  msg: IMessage
  prevUser: string
}

export function MessageItem ({ msg, prevUser }: MessageProps) {
  const isMyMessage = msg.user === 'Claudio'
  const isFirstMessage = !prevUser || msg.user !== prevUser

  const className = isMyMessage
    ? isFirstMessage
      ? 'message myself'
      : 'message myself same-user'
    : isFirstMessage
      ? 'message'
      : 'message same-user'

  return (
    <li id={String(msg?.id)} className={className}>
      {!isMyMessage && isFirstMessage && (
        <>
          <span className='msg-item-img'><UserDefaultAvatar /></span>
          <small>{msg.user}</small>
        </>
      )}
      <p>{msg.content}</p>
      <span>{getLocalTime(msg.date)}</span>
    </li>
  )
}
