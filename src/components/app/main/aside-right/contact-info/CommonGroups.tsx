import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../../../context/userContext'
import { getCommonGroups } from '../../../../../services/getCommonGroups'
import { IGroupMin } from '../../../../../types/types'
import './CommonGroups.css'
import { GroupItem } from './GroupItem'

interface ChatContactCommonGroupsProps {
  contactId: string | undefined
}

export function CommonGroups ({ contactId }: ChatContactCommonGroupsProps) {
  const { user } = useContext(UserContext)
  const [commonGroups, setCommonGroups] = useState<IGroupMin[]>([])
  useEffect(() => {
    if (!user || !contactId) return
    getCommonGroups(user.id, contactId)
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
