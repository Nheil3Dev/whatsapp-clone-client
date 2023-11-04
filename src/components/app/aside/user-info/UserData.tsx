import { useContext } from 'react'
import { toggleInputAlias, toggleInputInfo } from '../../../../actions/userInfoActions'
import { UserInfoContext } from '../../../../context/userInfocontext'
import { PencilIcon } from '../../../lib/icons/PencilIcon'
import { UpdateData } from './UpdateData'

interface UserDataProp {
  type: 'alias'|'info'
}

export function UserData ({ type }: UserDataProp) {
  const { userInfoState, dispatchUserInfo } = useContext(UserInfoContext)

  if (!userInfoState || !dispatchUserInfo) return null

  const { visibleInput, data } = userInfoState

  if (visibleInput[type]) return <UpdateData type={type} />
  return (
    <div className='profile-data'>
      <p>
        {data[type]}
      </p>
      <button
        className='icon-button'
        onClick={() => type === 'alias'
          ? dispatchUserInfo(toggleInputAlias)
          : dispatchUserInfo(toggleInputInfo)}
      >
        <PencilIcon />
      </button>
    </div>
  )
}
