import { IMessage } from '../../../types/types'
import { RemarkMsg } from '../../search/RemarkMsg'
import './FilteredMsgList.css'

interface FilteredMsgListProps {
  filteredMsgs: IMessage[]
  active: boolean
  filter: string
}

export function FilteredMsgList ({ filteredMsgs, active, filter }: FilteredMsgListProps) {
  if (!active) return <p className='ph-filter-search'>Buscar mensajes en ¡Al cielo con ella!</p>
  return (
    <ul className='msg-filtered-container'>
      {filteredMsgs.map((msg) => (
        <li key={msg.id} className='msg-filtered-item'>
          <small>{msg.date.toString()}</small>
          <p>{msg.user}: <RemarkMsg msg={msg.content} filter={filter} /></p>
        </li>
      ))}
    </ul>
  )
}
