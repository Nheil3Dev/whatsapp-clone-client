import { useContext } from 'react'
import { USER } from '../../../../../constants/user'
import { ChatContext } from '../../../../../context/chatContext'
import { IMessage } from '../../../../../types/types'
import { getDate } from '../../../../../utils/getDate'
import { RemarkMsg } from '../../../../lib/search/RemarkMsg'
import './FilteredMsgList.css'

interface FilteredMsgListProps {
  filteredMsgs: IMessage[]
  active: boolean
  filter: string
}

export function FilteredMsgList ({ filteredMsgs, active, filter }: FilteredMsgListProps) {
  const { chat } = useContext(ChatContext)

  if (!active) return <p className='ph-filter-search'>Buscar mensajes en {chat?.name}</p>
  return filteredMsgs.length === 0
    ? <p className='ph-filter-search'>No se encontraró ningún mensaje.</p>
    : (<ul className='msg-filtered-container'>
      {filteredMsgs.map((msg) => (
        <li key={msg.id} className='msg-filtered-item'>
          <a href={`#${msg.id}`}>
            <small>{getDate(msg.date, 'chat')}</small>
            <p>{msg.user === USER.alias ? '' : `${msg.user}: `}<RemarkMsg msg={msg.content} filter={filter} /></p>
          </a>
        </li>
      ))}
    </ul>)
}
