import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../../../context/userContext'
import { IGroupMin } from '../../../../../types/types'
import './CommonGroups.css'
import { GroupItem } from './GroupItem'

interface ChatContactCommonGroupsProps {
  contactId: string | undefined
}

export function CommonGroups ({ contactId }: ChatContactCommonGroupsProps) {
  const [commonGroups, setCommonGroups] = useState<IGroupMin[]>([])
  const { user } = useContext(UserContext)
  useEffect(() => {
    fetch(`http://localhost:1234/api/group/${user?.id}?contactId=${contactId}`)
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
