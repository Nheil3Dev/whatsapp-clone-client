import { IMessage } from '../../../types/types'
import './FilteredMsgList.css'

interface FilteredMsgListProps {
  filteredMsg: IMessage[]
  active: boolean
}

export function FilteredMsgList ({ filteredMsg, active }: FilteredMsgListProps) {
  if (!active) return <p className='ph-filter-search'>Buscar mensajes en ¡Al cielo con ella!</p>
  return (
    <ul className='msg-filtered-container'>
      {filteredMsg.map((msg) => (
        <li key={msg.id} className='msg-filtered-item'>
          <small>{msg.date.toString()}</small>
          <p>{msg.user}: {msg.content}</p>
        </li>
      ))}
    </ul>
  )
}
