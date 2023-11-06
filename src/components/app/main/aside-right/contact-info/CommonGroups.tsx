import { useEffect, useState } from 'react'
import { USER } from '../../../../../constants/user'
import { IGroupMin } from '../../../../../types/types'
import './CommonGroups.css'
import { GroupItem } from './GroupItem'

interface ChatContactCommonGroupsProps {
  contactId: string | undefined
}

export function CommonGroups ({ contactId }: ChatContactCommonGroupsProps) {
  const [commonGroups, setCommonGroups] = useState<IGroupMin[]>([])
  useEffect(() => {
    fetch(`http://localhost:1234/api/group/${USER.id}?contactId=${contactId}`)
      .then(res => res.json())
      .then((groups) => setCommonGroups(groups))
  }, [])
  return (
    <article className='common-groups'>
      <p className='common-group-title'>{commonGroups.length} grupo{commonGroups.length === 1 ? '' : 's'} en común</p>
      <ul className='common-group-list'>
      {
        commonGroups.map(group => (
          <GroupItem key={group?.id} group={group} />
        ))
      }
      </ul>
    </article>
  )
}
