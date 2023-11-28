import { WithoutChatsIcon } from '../../../lib/icons/WithoutChatsIcon'
import './WithoutChats.css'

export function WithoutChats () {
  return (
    <div className='without-chats'>
      <WithoutChatsIcon />
      <p>Sin chats de momento</p>
    </div>
  )
}
