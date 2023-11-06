import { compareDate } from '../../../../../utils/compareDate'
import { getDate } from '../../../../../utils/getDate'
import './MsgDate.css'

interface MsgDateProps {
  date: Date
  prevDate: Date
}

export function MsgDate ({ date, prevDate }: MsgDateProps) {
  if (compareDate(date, prevDate)) return null
  return (
    <div className="msg-date">
      {getDate(date, 'chat')?.toUpperCase()}
    </div>
  )
}
